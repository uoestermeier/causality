import streamlit as st
import streamlit.components.v1 as components

import numpy as np
import time
from PIL import Image, ImageDraw

st.title('Phenomenal Causality')

"""
"""

left, right = st.columns([1, 2])
with left:
    st.image('assets/david_hume.jpg', caption="David Hume")
with right:
    """
    The Scottish philosopher David Hume was sure that causal relations can only be infered from observations, 
    and not directly perceived. According to Hume, only the temporal priority of a cause before its effect 
    and the spatio-temporal proximity between cause and effect can be observed. Hume illustrates his thesis 
    with the collision of two billiard balls. The necessity with which the effect (movement) seems to follow
    the cause (impact) is due to preceding experiences and a completely subjective addition. The subject 
    interprets the observable spatio-temporal events in terms of unobservable causal relations.
    Many modern psychologists share Hume's view:
    "Because causal relations are neither observable nor deducible, they must be induced from observable events" (Cheng 1997, p. 367).
    "It is logically impossible to observe causal processes per se" (Ross & Fletcher 1985, p. 112).
    """
left, right = st.columns([1, 2])
with left:
    st.image('assets/albert_michotte.jpg', caption="Albert Michotte")
with right:
    """The Belgian psychologist Alber Michotte thougt otherwise.
    In his experiments with human subjects he showed animated objects that push or shove each other away.
    Michotte interpreted the reports of his subjects as direct phenomenal experiences of causation.
    Using various speeds, delays and types of movements, he concluded that Gestalt laws, 
    e.g. the law of good continuation, are the source of the impression, i.e. the more the animations
    cohered to the Gestalt laws the stronger the causal impression.

    
    """

col1, col2 = st.columns([2, 1])
with col1:
    st.image('assets/disks_used_by_michotte.tiff', caption="Michottes material")
    
with col2:
    """
    His apparatus used rotating disks that could be used to show the animations in different speeds.
    Today his experiments are replicated with computer animations. Experiments with young children
    show that even before language acquisition children seem the more surprised the more Gestalt
    expectations are violated.
    """
    


# bootstrap 4 collapse example
components.html(
    open('animations/michotte.html').read(),
    height=640
)


class Animation:

    width = 600
    height = 100

    startX = 20
    startY = 50
    radius = 15

    def __init__(self):
        self.out = Image.new("RGB", (self.width, self.height), (255, 255, 255))
        self.draw = ImageDraw.Draw(self.out)

    def circle(self, x, y, radius=15, fill=(0, 0, 0)):
        self.draw.ellipse([x-radius, y-radius, x+radius, y+radius], fill=fill)

    def get_frame(self, t=0):
        self.draw.rectangle((0, 0, self.width, self.height), fill=(255, 255, 255))
        if t < 100:
            self.circle(self.startX + t * 3, self.startY)
            self.circle(self.width/2, self.startY)
        if t > 100:
            self.circle(self.width/2, self.startY)
            self.circle(self.startX + t * 3, self.startY)
        return self.out

    def clear(self):
        del self.out



from streamlit_custom_slider import st_custom_slider

animation = Animation()
t = st_custom_slider('Slide time', 0, 200)
my_image = st.image(animation.get_frame(), caption='Animated launch event', width=600)
my_image.image(animation.get_frame(t), caption='Animated launch event', width=600)




"""
## Literature

Oestermeier, U. (2001). The Mathematisation of the Sciences and the Observability of Causal Relations.
In M. May & U. Oestermeier (Eds.), Interdisciplinary Perspectives on Causation (pp. 141-158).
Bern: Bern Studies in the History and Philosophy of Science. 
"""
