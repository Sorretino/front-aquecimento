"use server";

import axios from "axios";
import apiInstances from "@/apiserverAquecer/api";

interface Instance {
  phoneNumber: string;
  instanceId: string;
}
interface InstanceEvo {
  instanceId: string;
  name: string;
  phoneNumber: string;
  connectionStatus: string;
  profilePicUrl?: string;
}


interface StartConversationPayload {
  selectedInstances: Instance[];
}

export async function getInstancesHeaterGlobal() {
  //const response = await apiInstances.get("/warmup/instances");
   const response = await apiInstances.get("/Instances/instanceAll")

 // console.error("Erro ao parar response:", response);
  return response.data;
}

export async function PostInstanceHeaterCreate(
  instanceName: string,
  
) {
  try {
    const response = await apiInstances.post(
      `/instances/create`,
      {
        instanceName,
        qrcode: true,
        integration: "WHATSAPP-BAILEYS",
      },
      {
        headers: {
          "Content-Type": "application/json"
         
        },
      }
    );

    return response.data; // já vem { instance, qrcode }
  } catch (error: any) {
    console.error(
      "Erro ao criar instância:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function PatchIntanceHeaterCompanyGlobal(data: { id: string; connectionStatus: string }) {
   console.log(data,'data data')
    //console.log(apiInstances,'teste url')
   const response = await apiInstances.put(`/instances/${data.id}/connection-status`, data,);
   console.log(response.data,'response do update')
   return response;
}

export async function logoutHeaterInstance(companyId: string) {
   console.log(companyId,'data data')
    //console.log(apiInstances,'teste url')
   const response = await apiInstances.put(`/instances/${companyId}/logout`);
   console.log(response.data,'response do update')
   return response.data;
}

export async function deleteInstanceHeater(companyId: string) {
   console.log(companyId,'data data')
    //console.log(apiInstances,'teste url')
   const response = await apiInstances.delete(`/instances/${companyId}/delete`);
   console.log(response.data,'response do update')
   return response.data;
}


export async function getInstancesHeaterCount() {
  //const response = await apiInstances.get("/warmup/instances");
   const response = await apiInstances.get("/instances/warmupCount")

 // console.error("Erro ao parar response:", response);
  return response.data;
}

