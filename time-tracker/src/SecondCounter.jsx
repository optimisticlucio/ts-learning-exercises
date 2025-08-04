import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { runOncePerSecond } from './reducers.jsx';

export default function SecondCounter() {
    const dispatch = useDispatch();

    useEffect(() => {
        const id = setInterval(() => {
            dispatch(runOncePerSecond());
            //console.log(`Tick`); // For Debugging
        }, 1000);

        return () => clearInterval(id);
    },[dispatch] );

    return null; // or some UI if you want
}
