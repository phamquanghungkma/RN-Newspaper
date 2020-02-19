import React, { Component } from 'react';
import {View,Text} from 'react-native';

export const baseUrl = 'http://172.16.0.170:8000'
export const baseUrlImage = baseUrl  +  "/storage/"

async function getDataFromServer(){

  try {
    let respone = await fetch(baseUrl+"/api/news");
    let responeJson = await respone.json();
    return responeJson

  }
  catch(error){
    console.log('Loi load data',error)
  }
}
export{getDataFromServer}
