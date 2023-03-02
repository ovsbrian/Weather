const imagenes = document.getElementById("img_time");

const iconos = {
    0: "clearSky",
    1: "mainly",
    2: "mainly",
    3: "mainly",
    45: "fog",
    48: "fog",
    51: "drizzle",
    53: "drizzle",
    55: "drizzle",
    56: "freezinDrizzle",
    57: "freezinDrizzle",
    61: "rain",
    63: "rain",
    65: "rain",
    66: "freezinRain",
    67: "freezinRain",
    85: "freezinRain",
    86: "freezinRain",
    71: "snow",
    73: "snow",
    75: "snow",
    77: "snow",
    81: "shower",
    82: "shower",
    83: "shower",
    95: "hunderstorm",
    96: "hail",
    99: "hail",
  };
  
  const imgs = {
    clearSky: { src: "/imgs/clear sky.jpg" },
    drizzle: { src: "/imgs/Drizzle.jpg" },
    fog: { src: "/imgs/Fog.jpg" },
    shower: { src: "/imgs/chaparron.jpg" },
    freezinDrizzle: { src: "/imgs/Freezing Drizzle.jpg" },
    hail: { src: "/imgs/hail.jpg" },
    hunderstorm: { src: "/imgs/hunderstorm with slight.jpg" },
    freezinRain: { src: "/imgs/lluvia helada.png" },
    mainly: { src: "/imgs/Mainly clear.jpg" },
    rain: { src: "/imgs/Rain.jpg" },
    snow: { src: "/imgs/Snow fall.jpg" },
  };
  
  const cambioImgs = (icon) => {
    const imagen = imgs[iconos[icon]];
    if (imagen) {
      imagenes.src = imagen.src;
    }
  };
  