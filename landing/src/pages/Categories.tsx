import Card from "../components/Card"

const data = [
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-ads-template-design-2cbd7f3ba2c211457cd529547359e2be_screen.jpg?ts=1640909574",
    "https://i.pinimg.com/736x/ac/35/23/ac35239e31ed6bd301f79e093e8598fb.jpg",
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gaming-event-ad-design-template-0fd01430cfcea18dc229a099c6f9f2b3_screen.jpg?ts=1633425872',
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/dream-home-design-for-family-ad-template-2ddf44c7acca36c3a08a42fdc58185b2_screen.jpg?ts=1649060346",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1nx5Ly2opFPQqKnSzv1u0z-8yvEG2ATbvVg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3UBn-JZVvty85eTbH0dw6dg7TPHqZ-gOoUA&s",
    "https://i.pinimg.com/236x/7c/03/96/7c03965e4b5c1abf283c1ea9a28a7bc5.jpg",
    "https://png.pngtree.com/png-vector/20200408/ourmid/pngtree-online-shopping-with-two-ladies-with-their-shopping-bags-png-image_2179139.jpg"
]

const Categories = () => {
    return (
        <section className="p-2 bg-blue-300 flex flex-wrap justify-center gap-4 items-center">
            {data?.map((items: string) => (
                <Card key={items} img={items} />
            ))}
        </section>
    )
}

export default Categories