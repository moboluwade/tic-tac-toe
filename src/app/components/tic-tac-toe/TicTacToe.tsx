import BoardScreen from "./BoardScreen"

interface Props {
    mode: string;
}
const TicTacToe: React.FC<Props> = ({ mode }) => {

    return (
        <div className='w-48 h-48 md:w-[21rem] md:h-[21rem] relative bg-white rounded-md'>
            <BoardScreen mode={mode} />
        </div>
    )
}

export default TicTacToe