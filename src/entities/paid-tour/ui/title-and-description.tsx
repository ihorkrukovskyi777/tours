import './styles/title-and-description.scss';

interface Props {
    title: string,
    description: string,
}

const TitleAndDescription = ({title , description} : Props) => {
    return (
        <div className="title_and_description">
            <h2>{title}</h2>
            <div className="description">{description}</div>
        </div>
    )
}
export default TitleAndDescription;