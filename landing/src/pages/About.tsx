const About = () => {
    return (
        <section className="bg-blue-400 flex items-center gap-3 px-5">
            <article className="w-150 flex flex-col gap-5">
                <h1 className="font-bold text-3xl text-white">About Us – Building the Future of Shopping</h1>
                <p className="font-semibold text-[12px] text-white">At Amazon, our mission is simple: to be Earth’s most customer-centric company. From day one, we’ve been driven by innovation, passion, and a relentless commitment to providing customers with the best possible experience.
                    <br />

                    What began as an online bookstore has grown into a global platform where millions of people connect, shop, and discover. We believe in making life easier, smarter, and more convenient for everyone—whether it’s through fast delivery, groundbreaking technology, or services that empower communities and businesses worldwide.
                    <br />
                    Every day, we challenge ourselves to raise the bar. Because for us, it’s not just about selling products—it’s about shaping the future of how the world shops, lives, and thrives.</p>

                <button className="bg-red-500 animate-red active:translate-y-[5px] transition text-white py-3 rounded-2xl font-semibold">Shopping now</button>
            </article>
            <figure>
                <img className="w-150 object-contain" src="https://png.pngtree.com/png-clipart/20250531/original/pngtree-beauty-and-cosmetic-products-in-pink-shopping-trolley-png-image_21103523.png" alt="Cart" />
            </figure>
        </section>
    )
}

export default About