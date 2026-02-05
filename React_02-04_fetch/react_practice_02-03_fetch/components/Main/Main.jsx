"use client";

import styles from "./styles.module.css";
import Card from "./Card/Card";
import { useState } from "react";

const Main = () => {
    const mainTitle = "My recepies";

    const [recipies, setRecipies] = useState([
        {
            id: "0",
            imgUrl: "https://images.food52.com/tc29cm3fukp_gt4SZrCC70sqW0k=/51006ece-27c9-4bd0-8cd2-b3efda667fcc--food52_01-30-12-3449.jpg?w=1920&q=75",

            title: "Jim Lahey's No-Knead Pizza Dough + Margherita Pie",
            description:
                "Jim Lahey has refined his revolutionary no-knead bread technique for pizza and, astonishingly, it's even easier. Though Lahey loves smart, unusual toppings like charred thai eggplant with bonito flakes, shiitake with walnut onion puree, and cheese piled with spinach leaves, here we went with his version of the classic Margherita Pie. Lahey would want you to feel free to tinker, and to feel free to freeze the dough. Adapted very slightly from My Pizza: The Easy No-Knead Way to Make Spectacular Pizza at Home (Clarkson Potter, March 2012).",
        },
        {
            id: "1",
            imgUrl: "https://images.food52.com/aGpeAKPpuLy5ztvfCFIY-aj_aSc=/f0bd5a04-219a-4b51-9e65-b6a0af8ff072--2021-0126_the-mimi-pizza_3x2_julia-gartland_094.jpg?w=1920&q=75",

            title: "Mimi’s Pan Pizza Dough, Two Ways (The Mimi & The Papa)",
            description:
                "Pizza is one of my mother’s specialties in the kitchen. The style she makes is somewhere between a classic “Grandma style” pizza, and a typical pan-style pizza. Its crust is neither thin or thick—it's somewhere in between, with crisp edges and a fluffy interior. Since the dough can be made ahead (see step 2), and it’s baked on a sheet tray, it’s as weeknight friendly as it is weekend worthy.",
        },
        {
            id: "2",
            imgUrl: "https://images.food52.com/deDlNFReWHep8TukcGKtMpCbJ2o=/5986f2ab-1c1c-46dc-9b65-525c5b11db62--2015-0706_english-muffins_james-ransom-007.jpg?w=1920&q=75",

            title: "Deep Dish Pizza Dough",
            description:
                "This blend makes a dough that crisps nicely where it touches the pan, but stays soft and pillowy in the center.",
        },
        {
            id: "3",
            imgUrl: "https://images.food52.com/jhp6X88mv6AQJ38VPH7BqcAcc_I=/a64de072-3977-4f63-9623-1b8c2c442a21--detroit_3.jpeg?w=1920&q=75",

            title: "Detroit-Style Pizza",
            description:
                "This recipe is based off of one by the inimitable culinary Science Guy himself,: J. Kenji Lopez-Alt over at Serious Eats. The thing that really drew me in was the cheesy, crispy corners; this is almost more mind-blowing cheesy bread than pizza, in the best way. While the classic iteration of this 'za is topped with pepperoni (or nothing at all), it would also be excellent with caramelized onions, roasted mushrooms, or sautéed greens. Just stick with tradition and put half the toppings under the cheese layer, half on top.",
        },
        {
            id: "4",
            imgUrl: "https://images.food52.com/YpuTxG1eAKIwK1tef9cbAoTJJSY=/d504aa95-69af-45eb-9c1c-482c6b7527df--2021-0126_gluten-free-salad-pizza_3x2_julia-gartland_042.jpg?w=1920&q=75",

            title: "Salad Pizza With Gluten-Free Dough",
            description:
                "It’s more than possible to make a tasty gluten free pizza dough. You can opt to let the dough rest overnight after its initial rise; it will keep, wrapped well, up to 48 hours in the refrigerator. This dough has a tendency to feel stickier to the touch than a typical dough (handle it with lightly oiled or damp hands when shaping). Remember it also lacks some of the structure of a glutinous dough, so when you shape the dough, it’s more about pressing it out than it is stretching it.",
        },
        {
            id: "5",
            imgUrl: "https://images.food52.com/0Ij7leN4ZS2Y3zmKzitdHBus50g=/74d431e5-cdf9-499b-a152-929b3fa5df11--2021-0126_no-yeast-personal-white-pizza_3x2_julia-gartland_154.jpg?w=1920&q=75",

            title: "Personal White Pizza With No-Yeast Dough",
            description:
                "This dough is easy to make, requires no rise time, and produces a soft dough with crisp edges. It lacks some of the flavor of a typical yeast-raised pizza dough, but that just makes it all the better for loading up with flavorful toppings. I like making it into personal pizzas to ensure it gets that crispness I love.",
        },
    ]);

    return (
        <>
            <div className={styles["main-wrapper"]}>
                <h2 className={styles["main-header"]}>{mainTitle}</h2>
                <div className={styles["cards-wrapper"]}>
                    {recipies.map((r) => {
                        return <Card pizza={r} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default Main;
