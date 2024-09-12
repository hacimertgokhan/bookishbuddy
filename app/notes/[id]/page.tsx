import React from 'react';

interface Props {
    params: any,
}

const Page = (props:Props) => {
    return (
        <div>
            {props.params.id}
        </div>
    );
};

export default Page;