
import { useRef, useState } from "react";
import "./App.css";

const maleMatches = [
  {
    name: "Jogendar Hira",
    title: "Incoming Call Legend 📞",
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA2wMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAIHAf/EADgQAAIBAwMCBAQFAwMEAwAAAAECAwAEEQUSITFBBhMiURRhcZEjMlKBoQcVQhZy0VNisfAkM0P/xAAZAQADAQEBAAAAAAAAAAAAAAABAwQCAAX/xAAkEQACAgICAgICAwAAAAAAAAAAAQIRAyESMQQTQVEFIjIzNP/aAAwDAQACEQMRAD8AQWV+iQli4ye2aN0m8BmeUMQuaW/260YYSVfvUT2ckMTmObCgZ61loZLJegjX9S8ycBHyBSLU7wC3kBPOPekV7qMvxDgMSAcZoeSWSRCXY4NIWK58jUcnGLiTaa+xJW5JPApncXDTWyouWI7YpfolxEtwIpgNpPer1b2NikQlO3FU2LUqEWlRXg01rZVxu7+1SWnhl3bdM3Oe1WNL2xiyAVFSNqNoyHbIAcdq5aO5MpmuxRWchihIOOG+VVphuc5Oaba6G+Mlbdncc5pXEMnk1wAqKNdnI9VY0QByeflUZlO9QmKmJO5dxGK5bCyJVJHIwB2oqzgZyDghOnSjdOgW6kyACoqy29hGqqAg+lKyZeOh2LBy2V61031lguT9KKnsTt3BeB1OKs1vYKMkHH7V7qtqVsCIV6cnHepnktluPBG6KlFbLIwTtTW10ry8BF3L86jtbd2mQKOeOKuCWwdFCjGBzWJTZRmwQi00VW708EEkj6Yqs39l5TEqCM10afT8sdw+lKL3SJHBG36UceRpk2TFFopnSEBsZoJ4+Sec0fqltNZ3GHB2+9DgbjntVydqzzZRaZrps5sr2KbcQN3qq/LdxtEHDAqRwa56yjcc9DxTOwvdii2dj8j8qJksl1dRuBg1q1zFsA3c1X7i42OQGqNbpgc8mjRxYjcxgZzxUB1JQcbRSQXUkkioueT0qw2+lO0Ksw5PyoWcVBdRukGRIfvU51m9aJoyxOfamUWn6dLpE0hcCUUDLFAkEflD1d6FnAEKGQtvBya2EbKQrL6a2lkkgG4IT88cVH/cCRhlrSoDs0uoTHMrRZzTO41iY2SQhsEdaBN4rbTsHFbSmGWMMpw/tXOjiP4uTOTI1SJfNketqhWMNwMUdZaX8Tcxw7wm8j1ewrghuq6RLbWEd29xDNHKM5RskfI0hhwxwehrq3jrRLHSvBNrDZOsghVcuAMnPVj+5rlEI9a46YoBQVHCqMPSxJ9qMttNmuGAWIqD3NMdNto3RWYZNP7aNdoA4+lJeSimGGyDS9Njsotg5buabxKvHFaBQgAAqSJTuzg1LOTZZBKI1s4FYjjt3prDpiMuXxg0usQ4IyOKdW+/OMcfWspWFtroFOjQWs3mLCuG/wAqxrZQcqOKc7tw2kDHtUMse3jgDsAKM4g9jl2Kzbbh061DJbhV9QzTN8gYGKGnyUOawg2VDXdKiuFJAGT2qoahpq20e6Lk91rpDx/ic/elup2UBQtt9R702GRpipwUkcuVWE4BHGea0BzcNsJODTzW4Ug3FVwTSzSoPNk3ce9WwdogyRpmzQFjkA1KY9qZptEIEGGPIFRrH8VLtjTjPNaswjbQtP8AOm80jge9XJGRUC4BwKV2cPkpsVMcVOGwO9LezRzqOx1BlbylfaOvsa8jtrpJVWdSufer1dFdI07bH+O/cgUtnMd1FFO42tjpR5HUE6Va272ZFxGD0FT/AOltKu2KouxwP8TW+lgNb4Axxmme2OK4jkY4V1xxQs6itXPgi2RiVnbFAyaBZ2qllLO46e1Xa5jUxqxbgj3pBfhIww+VG2cUwqEnPHennhot/qPT41iMzG4UeUOrD/3mlsFo9/qsVqh2tNKFDHtXabjR9L8L6AlzJ8PJqEKYSSMeosRRckjlFvor39Y78Pp8dtEEVQ/RD29j9q5PDgMgX2q2+JpLzVLYS3ZH4Z2oAMH3qp28ZEg984rk00a4NPZbtNjAhU/Km1uwGN3HzzS+zXbbr9KjjtbzUZmCsYoh0z3pLSKlKlofx3FuZMGVPvT2wgilA2uh496qEPhuPb+JcNuzk4reTSJ4SPhL1uPdsUvgmaeSSOkWVlFvAc5+VNo4oF6KMj5Vx7frtu+6K9bI4xuq2eFtV1N0MepvuHv3FHUUZtzZe0SEtwFr1reJ2xVK8S6w+kWq3FurTuzYIB4FM9JupLi0gu3LJ5iBtjdqX7X9GvW1ux5Pp8ZUkEgil0tkcHBpBrXjO3sLpoQkshHUqOKWN/UEuuIbKUn5ijKPLaO5uPyPrq0cA8ECkt+p2YyCBQL+ML6T8tm5HcY7UJL4gE8ghuYHgkboSOKz62aWRMrni0hFUDucUntW8qNcHBIpr4pOTEO+c0g3Mo9+asx6RHmdsYiSSR0jU8E8mrvpNrZW8KM5BYjmqFarK67kHSndtJMIwHzTqTJ5Oi7rLYDgEYoGaSAyMUYbe1V3z2qImbPDV3rijPNk0d0kDyxzPvLfOsnmikRAAABQR0a+ZtzICfevW0a+IA2/yaTQzYxtL1YCOmB0ot5GuEVAw4O4c9KSLot8BjH81Mmk6ip9Jx+9dR2xvcTyKjB2XHHellxMhJLMpxz1rV9K1J+GYEVGdBu26kV1HbBPNtxJuU4cHIIOMGrPpN5JeQqs7740kGATSODwte3NwkMQBeRtoz0zV+1/whH4a8PWcluS8gIWeQn8zYrE46H4JUxDcNE3mmUZjLlQAPpVKuYlW/KxJgZ4JroEOnF9FjlZvXIzYXuOlVPULQQaqkWGyhG4nuTSsUt0U5khrDF6Y1+maPkkFvGdqk4Hah4uWGaPWLzMEDNabpnRjaKzPq8txcrCn4RJxmQ4FH6jZ3Wm39tBcX8QhnQN56x5UZ9veirrSoppS0kSknvWf2uR0SOOUiNPyq3IX71pSiLlGVntvpOqy6IdUWMSwhyuE4fA749q3sriSKRDvJDHnPUfI0c9tfS2qw3epXBhRdqqjbVA9uKAmjhgGyBWx+pjnJrM2jUIyRabWK11C2MM7sqnn0nqaK1JktIFRXyAoH0qvaVvIHXNNNQRiqq+fUKlbvRS4/JXL587pJQqJn8xFRWstk3p8/De/FFXCPDqEk17pwurUKBH6sYHvjvSiC10c32bm4lis927Z5RLf7ciqoJUSZJNPofAyQReZDJHKB1HGah1CCLU4V82ICQHO7uKTapawy3yjw+bjyGPSQ9KsOm2Fxbwoly5kPcmg6RuDvtFO122P91ijdWZETJ2/vSy/jWGNHdQm48LXQ7DRVv9buZZP/qtrR5mz37D/wA/xVO8aQqHsxCg/IWIH8UYT3QucFxsUQ36RL6K3bVSeg4pf8NJnBQit/hJKpJKJ31ORu3FaHUZfnWi2UlSCwkx0onUdi8lf0Cs8hf0j7UUQPaswK6jgTyF/SPtWeSv6R9qJOK1NcEHMS/pFalB+kfaiDUZXmuOIh+G4dOGXkEUR4l1WTUtF+HLELEoP+5qiYe9GaJpT6peNER+Co3OT/4rMlaCnTsrNvc3Jto1RQVBOFHvtpLqMDy3LXB3AhxuzVxuNCuLF54WBEMe5hcLyoH6f5FV3UDFGqhmBeQ9KjjqZc2pRIomwwxVgsYlaIe9Vy3bEnPTGKsNjINorWQ1jDPhM8jmto7YBgMYoqGQbK2Ay2c4pQ0CvLdQDu6e1V2Z0Nxg/lFWLUX/AAXZjgD+aQpZrJNE0LSNuXMgZcYPyoPRyGulYxuWnmqIPKh45xkGhNPstsYCKc0zvLOdrZHwSF96Wbk0DQ2izQqRgnHQ0FLosJfmFePYUw0Zjkq46HimLoGNMjJiXFCGLT4oyNqc/Sp5ocIWxTZIlBzQGqzAQkJ965thoUWk3l2uubPSzwRxhu/LHI+1UW8dbvUWJXCoNgH0q2yMRZXUigBXIyScZx7VVLVA0sj5yC3Bp3jq22TZ9RBLiJQ/AqIxqO1HXgXeeaGfrVZGRIoz0qbbUfPGBRCqSBXHHSya8NIv9QxewqWPWYpW2g0ORqhrWruF60uk1aCLq1Cz6vC4OG6j3ruQKGb3sKfnZRWiX8Dk+tapmrXTBgVbIPzoGK9kUghiP3rPINHRA4bkHg1LHqVxZ27rDMUDnnHGaRafqYNkJWB2gdcdaHvNXWaMogzmjYDot3JDLaQ2lx5mySFmZwcKW4PPvXPNa8Nf2yYT3XmlBkwvu/MD7iui2l5aX/hixuoXiLRqBsbGF7E4pd49vY00LDQ+fjC7gmAme4NKjD9mxnKkjnVryRnr1p3ZyBQBSK1b1be+acwjCggVjIWYxzDLleKnWcdPfrSaO4KHnpXj3TtJ6cgY7UkcMb9hJHsHIHOPeoYri4K77eCORUPKq2HH/NBSXTbRxk5rxJireYMBj17UKs4uGjara5LSKoJHTpRGp66nl/DwAuzDhU5/mq3b2dvNGJXGG6ke9HG3tGAWSFNnHau4mLoJ024W5ceXEY9vDZ96PLYOM5qCKZFASNVRQOOMUPNcFJBlgAay9GlsLaXG71YpHqcwHpJzz1zUlzdkdwRVe125aOxnnbBAQ10dnT0gvxFdT2XgxvjI0xdNstig9UZHc/WqZpk+5OMVZPG+q2moeAbKazvYWlDRq0YPq4HIH0rnFneyq4SM/m44NV+Mqi2zz8ztosV1u84knitZCoUGvba1upsbz1oyXRZXi6n9qoTV7EtA63dqlrtYDzOxrWO6jKA5pXfWE1uQQC31rVd20cgU6Sh8GdjfFbxStGd9YfVWbPtUg9mqXRnkbdWxocoI3LJ3oqNGZM1wAeRPO9NGQpZIVWUDPzqAhkYfWoLschvauoBc7efT5rBbbaqge1KJYbdJj5W370iimfsT96lFyw4rXwCgybdbrN5Nw8auu0qG685rpPiy6S58EedH5eyS2V0VTnjiuRXt20ilRUKahdYWATyGPbsCbuNvtXBSHdmR+9PYOVFVuykHpx24p5ay5zSZotxvRLdDYKHWUopPXtUt225aGkTzYsA44pY01k1GFPTu9Xeof7hGWz6mrwpGozLECQMZIqW1ktzIobYFzzxWkkMxq+w+11W2kQrOHXHTaa3OvQ/lZPR0pxaWOjSR7iATj2xW1xa6FFES0YL9uM11DHGJFb67aXESYcKw4wa2urjegKkN86SyWenEq8UXq7bTRNsHSLD9c0qSEvT0FxqZAAaW69EJLKS3JxvwKaq2FBpJqku+fFHEqYrNL9SrT6MNiQbyYwSQuejVtZ6DHHMGzyDTYupkw1HARqqlOarXRA9nvk+XGoQeqnEdiTbqWJBIqG2tjt8wru46Uw8xzEARRM9Ff1fSwYWIIGKqLWTFjhhirxrUuyykDNg4qgNdzhiAR1rSQDo9j/T3V0TzbmHc36Vk4+9aXvhma3DfFafNGn6oyX/jrTm01DVNLnEMkkqOOqEkE/setWvTPEcd3+FqMS5/6ijBH1o+R+NyNcscrKlklh/tjr7OSN4dE4Z7C5WUr/h/lS+6mbTz5N1G0TjqG712nW/CVnqC/F2B8ubqssfX96p99pq3QOmeJLfodqXajGPZq8yOXNinxyFHpxZo8sbObzarGDkJuPahH1SVz6I8fOjfEnhy50K9MMv4kL+qOVejDtSfZg1dGUZK0RuDT2SPeXDHlgB9KiaWV/8A9K3PIqJkxzWrBR4SwGS9bWakzKQ2eajQZBFG2KYOaL0gpDBGaJtx6ZptbTZAPyoKBQy4PQ1qV+Gf/tPSluh20N3kyuKJtY9yZpRFcbhhutNtOmAIzSpqh8JKiWWDcMYzQzaVvydtWC2SNgSaMjSJSOcUlN2Mtoqy6XMiAh5sewr2PTpi24mRh/31eERHUKnJrS4tYgmCPV3otug8ytW9vj07a9ueMJjHNPJoUjTcvakV7PtlZvasxuTBJpIiuLjyoTnpiqbqerybyI+maYa3dkwtiqw0xlGDVeONEOXJyJ01GQzru6k1d9PUSwIzdap1hBEGDSHBp6mrW9rF6TlhTuEn0J5ItsdyI4goqGS+2nPtVNGuySy4H5aY/GySRAKvBHWu9bXZm7ANT1B7y7lj3YShzpKscgsc+1D3Ja2ufOB3Nnp7Vh1CcHitAO8Wmo6V4ihEDrvcjIguPTIP9j96AutFuLAtLb7rq1X8ykYmh/buKo0Qms4kktnFxb5yJI2yP+RV80LxRDIkKXE7S8YMhH4kJ+f6lqfx/Knje2VxySiq7Qz0bUDBHC0TCSOXnAPGP+aaa1ptprNi24Bx1z7Gll9p7xSm905VLsu6SFfyTD9SezfKodF1hYLlUY5gm4Oe3/vercmOPlY3KPYmniftx9fRSL1Qwk8P6uMeoi1mbqp7c1zy+tWtbuW3nXEkbYauy/1O0gPbC9jHqiIO5euD0P7GuX+I3+LhttRxh3HlSkfqHT+K8bA3CfE9LMozxrJEQMoP5a0KnBxWzEjmon3ygiM8d6uRCzSNfNnIXoOtNLePaAKH0iINGXxznk02jhwQcUJMMI2EWi9KKa2EiYry1TpTCNKVyKUrQguLSSEnZWW928GBIOafzQBh2NL5LYbvygftWrTMONdBtprChQG4o5dTjO0qckUgOmxtyCwPuDXh0mYjMdyfoRWHBBUmWuLWlUn1bc1L/d04LSZ/eqamnXYJBmGPkKJt9OcyAGRj75rPBGlJjnUddQRuF5OKo954ilmlcL74pzrqpZWbsvLdB+9VGO2IOW/MeTTcUUJy2yV7iWXJkNQDbGdw61uyNkgVosAD+vOKojVkriyS39bMXPFMora3kj2gbnxQAt1JHlvge1ERQyxsGjbmrI5YqIiUXZYNJ0SN1yzgH50v8S3TWE3w0Lce4pppXmOnL4NVvxPC6XoLtuFTtt7G0khclwxfLHOe9SNPzxQWWXnBrN0h5C0AFij1C60+bzbWUoVOCuPSw+Y71e5beOTQI9XjBguQRkQnCH9qysqHKkORcfA1/cXIit5GHlvCZRj/AAYfp9q28S28UF0GiXZ56B3A6bs4yK8rKo/GSfJIbi/m0Gam5uvCCtPhj8O4+3SuMajx4buB+m5Uj+aysqLNry5Irx/5Wb2+k2U/9Pm1OSH/AOYLox+YCelBWltEkHC9RzmsrKob2TJaBtFUF7hf8VPApyigcVlZQkaxhcCjIpjABxWVlLZTEmZF25xQUyjNZWVyMyI+nSiIm9ArKytGD1umaltVHqbHOKysrLNLsrHi12aeKIn0E5xS1o1GOKysp8ehEuzXy1PatWjX2r2sogogdQvTishnkVsA1lZRQqSQxt7uYHAbH0obViZE3Ocn3rKytoXLsSscV4GOKysrRln/2Q==",
    caption: "Incoming call from the CEO of Neighbourhood Gossip.",
    joke: "He says 'Hello?' like the Prime Minister is calling him personally.",
    emoji: "📞",
  },
  {
    name: "Pappu",
    title: "CEO of Bakchodi 🕺",
    image:
      "/images.jpg",
    caption: "Biodata says simple boy. Friends say please mute him.",
    joke: "His three moods are hungry, sleepy, and forwarding memes at 2 AM.",
    emoji: "😂",
  },
  {
    name: "rock",
    title: "Wi-Fi Password Specialist 📶",
    image:
      "saruk.jpg",
    caption: "Can connect to every Wi-Fi except his life plan.",
    joke: "His love language is asking for your Wi-Fi password.",
    emoji: "📶",
  },
  {
    name: "Tinku",
    title: "Mumma's Premium Plan 🍼",
    image:
      "sal.jpg",
    caption: "Family-approved beta version. Mumma is the administrator.",
    joke: "Before saying yes, he needs approval from the board of directors: Mumma.",
    emoji: "🍼",
  },
  {
    name: "Rocky",
    title: "Gym Without Results 💪",
    image:
      "are.jpg",
    caption: "Gym membership active. Workout attendance still loading.",
    joke: "He takes 47 gym selfies and one actual dumbbell lift.",
    emoji: "🏋️",
  },
];

const femaleMatches = [
  {
    name: "Pinky",
    title: "Missed Call Maharani 👑",
    image:
      "h1.jpg",
    caption: "One missed call, seven theories, and a full investigation.",
    joke: "She can detect a suspicious 'hmm' from three kilometres away.",
    emoji: "👑",
  },
  {
    name: "Rinku",
    title: "Drama Loading 🎬",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
    caption: "A normal Tuesday becomes a three-season web series.",
    joke: "She says 'I'm fine' with background music and end credits.",
    emoji: "🎬",
  },
  {
    name: "Babli",
    title: "Reel Minister 📱",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",
    caption: "Has watched 400 reels and remembers every sound.",
    joke: "Her screen-time report needs a therapist and a government inquiry.",
    emoji: "📱",
  },
  {
    name: "Sweety",
    title: "Snack Auditor 🍟",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
    caption: "Says she is not hungry, then eats half your fries.",
    joke: "She does not steal your snacks. She performs a quality audit.",
    emoji: "🍟",
  },
  {
    name: "Dolly",
    title: "Professional Overthinker 🧠",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    caption: "Sent 'okay' at 9:01 and analysed your reply until midnight.",
    joke: "She can turn a full stop into a 12-episode mystery.",
    emoji: "🧠",
  },
];

const jokes = [
  "Compatibility: 99%. Shared brain cells: 1. 💍",
  "Cupid has reviewed your biodata and requested a salary increment. 🏹",
  "Your love story is loading. Please check your Wi-Fi connection. 📶",
  "The algorithm found potential. Your friends found fresh meme material. 😂",
  "Aunty has entered the chat. Everybody act normal. 👀",
];

function App() {
  const [lookingFor, setLookingFor] = useState("Male");
  const [stage, setStage] = useState("idle");
  const [result, setResult] = useState(null);
  const [searchCount, setSearchCount] = useState(0);
  const [joke, setJoke] = useState(jokes[0]);

  // Store timer IDs so a new search can cancel the previous search.
  const timers = useRef([]);

  const clearSearchTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  const findSoulmate = () => {
    clearSearchTimers();
    setResult(null);
    setStage("searching");

    timers.current.push(
      window.setTimeout(() => {
        setStage("funny");
      }, 1800)
    );

    timers.current.push(
      window.setTimeout(() => {
        const pool =
          lookingFor === "Male"
            ? maleMatches
            : lookingFor === "Female"
              ? femaleMatches
              : [...maleMatches, ...femaleMatches];

        // Avoid the last character when another option is available.
        let choices = pool.filter(
          (person) => person.name !== result?.name
        );

        if (choices.length === 0) {
          choices = pool;
        }

        const match =
          choices[Math.floor(Math.random() * choices.length)];

        setResult(match);
        setSearchCount((count) => count + 1);
        setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
        setStage("result");

        window.setTimeout(() => {
          document
            .getElementById("match-result")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }, 4000)
    );
  };

  return (
    <div className="app-shell">
      <div className="announcement">
        <span className="live-dot" />
        LIVE-ISH MATCHMAKING <span>•</span> FICTIONAL COMEDY CHARACTERS
        <span>•</span> 0% AUNTIE INTERFERENCE
      </div>

      <header className="navbar">
        <a className="brand" href="#home">
          💘 rishta<span className="brand-dot">.exe</span>
        </a>
        <nav>
          <a href="#search">Soulmate search</a>
          <a href="#how">How it works</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              ✦ INDIA'S MOST UN-SERIOUS MATCHMAKER
            </div>

            <h1>
              Find your soulmate.
              <br />
              <span>Find your next meme.</span>
            </h1>

            <p className="hero-description">
              Select Male or Female. Cupid will find a random funny
              character with the confidence of a family WhatsApp forward.
            </p>

            <a className="primary-btn" href="#search">
              Find my soulmate ↘
            </a>

            <p className="hero-note">
              Warning: may contain dad jokes, dramatic entries, and
              questionable biodata.
            </p>
          </div>

          <div className="hero-art">
            <div className="hero-blob" />

            <div className="hero-photo-wrap">
              <img
                src="https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1100&q=85"
                alt="Illustrative couple laughing"
              />
            </div>

            <div className="floating-note note-top">
              🧠 Compatibility: vibes only
            </div>

            <div className="floating-note note-bottom">
              📞 Cupid is typing...
            </div>

            <div className="heart-sticker">💗</div>
          </div>
        </section>

        <section className="search-section section-wrap" id="search">
          <div className="section-heading">
            <div>
              <div className="eyebrow">01 / THE MAIN EVENT</div>
              <h2>
                Who are we finding?
                <br />
                <span>Let fate cook.</span>
              </h2>
            </div>

            <p>
              Choose Male or Female. Each search randomly selects a funny
              character and reveals the picture after a dramatic pause.
            </p>
          </div>

          <div className="criteria-panel">
            <label className="criteria-field">
              <span>Find me a...</span>

              <select
                value={lookingFor}
                onChange={(event) => setLookingFor(event.target.value)}
                disabled={stage === "searching" || stage === "funny"}
              >
                <option value="Male">Male 🤵</option>
                <option value="Female">Female 👰</option>
                <option value="Random">Random chaos 🌪️</option>
              </select>
            </label>

            <button
              className="primary-btn search-btn"
              onClick={findSoulmate}
              disabled={stage === "searching" || stage === "funny"}
            >
              {stage === "searching" || stage === "funny"
                ? "🔎 Cupid is searching..."
                : "💘 Find my soulmate ↗"}
            </button>

            <p className="privacy-note">
              Demo only: no real profiles, accounts, or personal data are
              used.
            </p>
          </div>

          {stage !== "idle" && (
            <div
              className={`stage-card ${stage}`}
              id="match-result"
              aria-live="polite"
            >
              {stage === "searching" && (
                <>
                  <div className="stage-emoji">📞💘</div>
                  <h3>Incoming call from Cupid...</h3>
                  <p>
                    Checking biodata, asking one aunty, and putting the
                    phone on speaker.
                  </p>
                  <div className="loading-track">
                    <span />
                  </div>
                </>
              )}

              {stage === "funny" && (
                <>
                  <div className="stage-emoji">🧠📋</div>
                  <div className="eyebrow">OFFICIAL-ISH REPORT</div>
                  <h3>
                    Candidate approved by the Department of Delulu.
                  </h3>
                  <p>
                    Photo retrieval in progress. Please keep your
                    expectations at a comfortable meme level.
                  </p>
                  <div className="loading-track">
                    <span />
                  </div>
                </>
              )}

              {stage === "result" && result && (
                <div className="result-layout">
                  <div className="result-image-wrap">
                    <img
                      src={result.image}
                      alt={`Illustrative comedy match: ${result.name}`}
                    />

                    <span className="result-emoji">{result.emoji}</span>
                    <span className="incoming-label">
                      INCOMING CALL
                    </span>
                  </div>

                  <div className="result-copy">
                    <div className="eyebrow">
                      CUPID'S RANDOM PICK #{searchCount}
                    </div>

                    <h3>{result.name}</h3>
                    <h4>{result.title}</h4>
                    <p>{result.caption}</p>

                    <div className="joke-box">
                      <strong>☎ CALLER ID:</strong>
                      <p>{result.joke}</p>
                    </div>

                    <button className="primary-btn" onClick={findSoulmate}>
                      Find another one ↻
                    </button>

                    <p className="privacy-note">
                      Fictional joke character. Stock photos are
                      illustrative and do not identify the named character.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="how-section section-wrap" id="how">
          <div className="eyebrow">02 / VERY ADVANCED TECHNOLOGY</div>
          <h2>
            Three steps to <span>delulu.</span>
          </h2>

          <div className="steps-grid">
            <article>
              <span>01</span>
              <div>🔎</div>
              <h3>Pick your category</h3>
              <p>Choose Male, Female, or Random chaos. No paperwork required.</p>
            </article>

            <article>
              <span>02</span>
              <div>📞</div>
              <h3>Wait for the call</h3>
              <p>
                Cupid creates suspense because apparently even algorithms
                need drama.
              </p>
            </article>

            <article>
              <span>03</span>
              <div>😂</div>
              <h3>Meet the meme</h3>
              <p>
                Get a random comedy character, incoming-call label, and
                silly caption.
              </p>
            </article>
          </div>

          <div className="prediction">
            <span>✨ THE ALGORITHM HAS SPOKEN</span>
            <p>{joke}</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          💘 rishta<span className="brand-dot">.exe</span>
        </a>
        <p>Made with chai, chaos, and questionable Wi-Fi. © 2026 Rishta.exe</p>
      </footer>
    </div>
  );
}
export default App;