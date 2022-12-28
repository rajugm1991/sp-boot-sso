import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { LoadingOutlined, SettingOutlined, UserSwitchOutlined } from "@ant-design/icons";
import {  postRequest } from "../../util/APIUtils";


const BecomeInstructor = () => {
    const user = useSelector(state => state.auth)

    const [loading, setLoading] = useState(false);


    const becomeinstructor = () => {
        console.log("become instructor");
        setLoading(true);
        const body = { userId: user.currentUser.id }
        postRequest("/user/api/stripe/createAccount", body).then((res) => {
            console.log(res);
            window.location.href = res.url;
        }).catch(err => {
            console.log(err.status);
            // Toast('Stripe onboarding failied.Try again');
            setLoading(false);
        })

    }
    return (
        <React.Fragment>
            <h1 className="jumbotron text-center square">Become instructor </h1>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <div className="pt-4">
                            <UserSwitchOutlined className="display-1 pb-3/>" />
                            <br />
                            <h2>Setup payout to publish courses on edemy</h2>

                            <p className="lead text-warning"> Edemy partners with stripe to transfer earnings to your bank account</p>


                            <Button className="mb-3" type="primary" block shape="round" icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                                size="large" onClick={becomeinstructor} disabled={user.currentUser.adminUser || loading}>
                                {loading ? "Processing..." : "Payout setup"}

                            </Button>
                            <p className="lead">
                                You will be rediected to strpe to complete onboardning process.
                            </p>
                        </div>

                    </div>

                </div>


            </div>
        </React.Fragment>

    )
}

export default BecomeInstructor;