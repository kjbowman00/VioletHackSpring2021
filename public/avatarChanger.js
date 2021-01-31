"use strict";
var avatarNum = 1;

function changeAvatar(dir){
    if(dir<0){
        avatarNum = avatarNum - 1;
        if (avatarNum==0){
            avatarNum = 6;
        }
    }
    if(dir>0){
        avatarNum = avatarNum + 1;
        if (avatarNum==7){
            avatarNum = 1;
        }
    }
    document.getElementById("avatar").src = "/Avatars/avatar"+avatarNum+"_1.png";
}