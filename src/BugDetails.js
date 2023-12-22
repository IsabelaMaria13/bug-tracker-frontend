import React from 'react';
import { useParams } from 'react-router-dom';

const BugDetails = () => {
    const { bugId } = useParams();
    return (
        <div>hello</div>
    )
}
export default BugDetails;