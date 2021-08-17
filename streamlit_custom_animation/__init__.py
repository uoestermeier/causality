_RELEASE = True
import os
import streamlit.components.v1 as components

# Now the React interface only accepts an array of 1 or 2 elements.
_component_func = components.declare_component(
    "custom_animation",
    url="http://localhost:3000",
)

# parent_dir = os.path.dirname(os.path.abspath(__file__))
# build_dir = os.path.join(parent_dir, "frontend/build")
# _component_func = components.declare_component("custom_animation", path=build_dir)
   

# Edit arguments sent and result received from React component, so the initial input is converted to an array and returned value extracted from the component
# def st_custom_animation(label: str) -> int:
#     component_value = _component_func(label=label)
#     return component_value


# Edit arguments sent and result received from React component, so the initial input is converted to an array and returned value extracted from the component
def st_custom_animation(label: str, value: int = 0, key=None) -> int:
    component_value = _component_func(label=label, initialValue=[value], key=key, default=[value])
    return component_value[0]
