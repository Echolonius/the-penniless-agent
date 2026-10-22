"""Compare two pytest JUnit XML reports test by test.

Usage: compare_junit.py BASE.xml FIX.xml [BASE2.xml FIX2.xml ...]

Every test is keyed by classname + name and given one outcome: passed,
failed, error or skipped. The script prints how many tests each run had,
every test whose outcome changed, every test that disappeared, and every
test that only the fix run has. It exits 1 if any test present in the
base run changed outcome or disappeared, so a fix can only add tests.
"""

import sys
import xml.etree.ElementTree as ET
from collections import Counter


def outcomes(path):
    result = {}
    for case in ET.parse(path).getroot().iter("testcase"):
        key = f"{case.get('classname')}::{case.get('name')}"
        tags = {child.tag for child in case}
        if "error" in tags:
            outcome = "error"
        elif "failure" in tags:
            outcome = "failed"
        elif "skipped" in tags:
            outcome = "skipped"
        else:
            outcome = "passed"
        if key in result:
            raise SystemExit(f"duplicate test id in {path}: {key}")
        result[key] = outcome
    return result


def main(paths):
    if len(paths) % 2:
        raise SystemExit(__doc__)
    base, fix = {}, {}
    for base_path, fix_path in zip(paths[::2], paths[1::2]):
        base.update(outcomes(base_path))
        fix.update(outcomes(fix_path))

    print("base:", len(base), dict(Counter(base.values())))
    print("fix: ", len(fix), dict(Counter(fix.values())))

    changed = sorted(k for k in base if k in fix and base[k] != fix[k])
    removed = sorted(k for k in base if k not in fix)
    added = sorted(k for k in fix if k not in base)

    for k in changed:
        print(f"CHANGED  {base[k]} -> {fix[k]}  {k}")
    for k in removed:
        print(f"REMOVED  {base[k]}  {k}")
    for k in added:
        print(f"ADDED    {fix[k]}  {k}")
    print(
        f"{len(changed)} changed, {len(removed)} removed, {len(added)} added"
    )
    return 1 if changed or removed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
