export default function Card({image, title, description, link}) {
    return (
        <div className={"col-md-6 col-lg-3"}>
            <div className={"card"}>
                <div className={"card-body text-center"}>
                    <img src={image} className={"card-img-top mb-3"}></img>
                    <h5 className={"card-title"}>{title}</h5>
                    <p className={"card-text"}>{description}</p>
                    <a href={link} className={"btn btn-primary"}>Acceder</a>
                </div>
            </div>
        </div>
    )
}