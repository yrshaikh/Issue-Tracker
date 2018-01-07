import React from 'react';
import Form from './form';

class Body extends React.Component {
    render() {
        return (
            <div id="projects" className="body row">
                <Form />
                <div className="col-sm-6 prompt">

                    <h5>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet... </h5>
                    <p>
                        Donec efficitur risus sit amet leo cursus,
                         vitae ornare nisi feugiat. Suspendisse iaculis elit ut porttitor bibendum.
                          Donec id lectus enim. Etiam pellentesque dolor ipsum,
                           et congue lacus congue a.
                           Ut pellentesque congue mollis. Duis ac neque orci.
                            Duis lacinia, enim eget porttitor viverra,
                           turpis turpis laoreet odio, ac hendrerit odio sapien nec purus.
                    </p>

                </div>
            </div>
        );
    }
}

export default Body;
