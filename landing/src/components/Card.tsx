const Card = ({ img }: { img: string }) => {
    return (
        <img className="w-60 h-60 hover:scale-[1.5] transition" src={img} alt="Ad" />
    )
}

export default Card