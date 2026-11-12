"""Test configuration: pure logic module + Home Assistant test harness."""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

pytest_plugins = "pytest_homeassistant_custom_component"

LOGIC_PATH = (
    Path(__file__).resolve().parent.parent
    / "custom_components"
    / "flueguard"
    / "logic.py"
)

spec = importlib.util.spec_from_file_location("flueguard_logic", LOGIC_PATH)
assert spec is not None and spec.loader is not None
module = importlib.util.module_from_spec(spec)
sys.modules["flueguard_logic"] = module
spec.loader.exec_module(module)
