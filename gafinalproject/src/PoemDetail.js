import { useOutletContext } from "react-router"

export default function PoemDetail() {
    
    const obj = useOutletContext();

    return (
        <>
        <p>PoemDetail Component</p>
        <pre>{JSON.stringify(obj, null, 2)}</pre>
        </>
    )
}