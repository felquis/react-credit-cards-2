#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root_dir"

versions=("17.0.2" "18.2.0" "19")

mode="${REACT_MATRIX_MODE:-compat}"

for version in "${versions[@]}"; do
  echo ""
  echo "=== React ${version} (${mode}) ==="

  if [[ "$mode" == "compat" ]]; then
    if [[ "$version" == 17.* ]]; then
      testing_library_version="12.1.5"
      react_test_renderer_version="17.0.2"
    elif [[ "$version" == 18.* ]]; then
      testing_library_version="16.3.2"
      react_test_renderer_version="18.2.0"
    else
      testing_library_version="16.3.2"
      react_test_renderer_version="19"
    fi

    npm install \
      "react@${version}" \
      "react-dom@${version}" \
      "react-test-renderer@${react_test_renderer_version}" \
      "@testing-library/react@${testing_library_version}" \
      "@testing-library/dom@^10.0.0" \
      --no-save \
      --legacy-peer-deps
  else
    # Legacy mode reproduces failures with the repo's default testing deps.
    npm install \
      "react@${version}" \
      "react-dom@${version}" \
      --no-save \
      --legacy-peer-deps
  fi

  npm test -- --runInBand
done
