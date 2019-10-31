import React, { Component } from 'react';
import { Widget } from "@uploadcare/react-widget";


class ProfileIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div id="wrapper-profile-image-presentationSetting">
            <div id='profile-image-presentationSetting'>
                <div class="image-cropper">
                    <img class="profile-picture-presentation-setting" src="https://ucarecdn.com/85b5644f-e692-4855-9db0-8c5a83096e25/image.jpg" />
                </div>
            </div>
            <div id='uploadcare-button-wrapper-presentation-setting'>
                <p class="uploader-demo-crazy">
                    <label htmlFor='file'></label>{' '}
                    <Widget publicKey='e4f375cf05399c58b04a' id='file'
                        onFileSelect={(file) => {
                            console.log('File changed: ', file)
                            if (file) {
                                file.progress(info => console.log('File progress: ', info.progress))
                                file.done(info => console.log('File uploaded: ', info))
                            }
                        }}
                        onChange={info => console.log('Upload completed:', info)} />
                </p>
            </div>
            <div id='uploads-Div-presentation-setting'>
                <div class="image-cropper-uploads-Div">
                    <img class="profile-picture-presentation-setting" src="https://ucarecdn.com/85b5644f-e692-4855-9db0-8c5a83096e25/image.jpg" />
                </div>
            </div>
        </div>
         );
    }
}
 
export default ProfileIcon;