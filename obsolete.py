
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


animation = Animation()
my_image = st.image(animation.get_frame(), caption='Animated launch event', width=600)
t = st.slider('Slide time', 0, 200)
my_image.image(animation.get_frame(t), caption='Animated launch event', width=600)

