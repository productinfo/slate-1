/* @jsx h */
import h from '../hyperscript';

export default (
    <value>
        <document>
            <blockquote>
                <paragraph>P1</paragraph>
                <paragraph>
                    <cursor />
                    P2
                </paragraph>
                <paragraph>P3</paragraph>
            </blockquote>
        </document>
    </value>
);
