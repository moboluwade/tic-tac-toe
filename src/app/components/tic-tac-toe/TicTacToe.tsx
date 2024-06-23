import BoardScreen from "./BoardScreen"

interface Props {
    mode: string;
}
const TicTacToe: React.FC<Props> = ({ mode }) => {

    return (
        <div className='w-[21rem] h-[21rem] relative bg-white rounded-md'>
            <BoardScreen mode={mode} />
        </div>
    )
}

export default TicTacToe