import streamlit as st

st.title('Phenomenal Causality')

left, mid, right = st.columns([1, 2, 1])
with left:
    st.image('assets/david_hume.jpg', caption="David Hume")
with mid:
    """
    Whereas David Hume was sure that causal relations can only be infered from observations, 
    and not directly perceived, the Belgian psychologist Alber Michotte thougt otherwise.
    Michotte showed animated objects to his humane subjects that push or shove each other away.
    His subjects reported impressions that he interpreted as direct phenomenal experiences of causation.
    """
with right:
    st.image('assets/albert_michotte.jpg', caption="Albert Michotte")

col1, col2 = st.columns([2, 1])
with col1:
    st.image('assets/disks_used_by_michotte.tiff', caption="Michottes material")
    
with col2:
    """
    His apparatus used rotating disks that could be used to show the animations in different speeds.
    With different speeds of processes and delays between events, the causal impression also changed. """
    
  


"""
## Literature

Oestermeier, U. (2001). The Mathematisation of the Sciences and the Observability of Causal Relations.
In M. May & U. Oestermeier (Eds.), Interdisciplinary Perspectives on Causation (pp. 141-158).
Bern: Bern Studies in the History and Philosophy of Science. 



"""
