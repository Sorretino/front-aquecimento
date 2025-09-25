// "use server";

// import axios from "axios";
// import apiInstances from "@/apiserverAquecer/api";

// interface Instance {
//   phoneNumber: string;
//   instanceId: string;
// }
// interface InstanceEvo {
//   instanceId: string;
//   name: string;
//   phoneNumber: string;
//   connectionStatus: string;
//   profilePicUrl?: string;
// }


// interface StartConversationPayload {
//   selectedInstances: Instance[];
// }

// export async function getInstances() {
//   //const response = await apiInstances.get("/warmup/instances");
//    const response = await apiInstances.get("/warmup/instance")

//   console.error("Erro ao parar response:", response);
//   return response.data;
// }

// export async function startConversationAction(selectedInstances: StartConversationPayload) {
//   try {
//     // console.log(selectedInstances,'teste')
//     // return;
//     const response = await axios.post("https://multatendiment-aquecimento.ybrsom.easypanel.host/warmup/start-conversation", selectedInstances);
    
//     return response.data;
//   } catch (error: any) {
//     console.error("Erro ao iniciar conversa:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || error.message);
//   }
// }
// export async function startConversationAction1(selectedInstances: Instance[]) {
//   try {
//     const response = await axios.post("https://multatendiment-aquecimento.ybrsom.easypanel.host/warmup/start-conversation", {
//       selectedInstances,
//     });
   
//     return response.data;
//   } catch (error: any) {
//     console.error("Erro ao iniciar conversa:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || error.message);
//   }
// }

// export async function stopConversationAction(selectedInstances: Instance[]) {
//   try {
//     const response = await  apiInstances.post("/warmup/stop-conversation", {
//       selectedInstances,
//     });
//     return response.data;
//   } catch (error: any) {
//     console.error("Erro ao parar conversa:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || error.message);
//   }
// }



// export async function getWhatsappInstances(apiUrl: string, apiKey: string): Promise<InstanceEvo[]> {
//   try {
//     const response = await axios.get(`${apiUrl}/instance/fetchInstances`, {
//       headers: {
//         "Content-Type": "application/json",
//         apikey: apiKey, // chave da API
//       },
//     });
// // console.log(response.data,'dados')
//     // Ajuste conforme o retorno real da API
//     return response.data || [];
//   } catch (error: any) {
//     console.error("Erro ao buscar instâncias:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || error.message);
//   }
// }

// //SELECAO DAS RUNING
// export async function getRunningStatus() {
//   try {
//     const response = await axios.get("https://multatendiment-aquecimento.ybrsom.easypanel.host/instances/instance/running"); 

//     //console.log(response.data,'response getRunningStatus')
//     return response.data;
//   } catch (err) {
//     console.error(err);
//     return false;
//   }
// }

"use server"

import axios from "axios"
import apiInstances from "@/apiserverAquecer/api"

interface Instance {
  phoneNumber: string
  instanceId: string
}
interface InstanceEvo {
  instanceId: string
  name: string
  phoneNumber: string
  connectionStatus: string
  profilePicUrl?: string
}

interface StartConversationPayload {
  selectedInstances: Instance[]
}

export async function getInstances() {
  //const response = await apiInstances.get("/warmup/instances");
  const response = await apiInstances.get("/warmup/instance")

  console.error("Erro ao parar response:", response)
  return response.data
}

export async function startConversationAction(selectedInstances: StartConversationPayload) {
  try {
    // console.log(selectedInstances,'teste')
    // return;
    const response = await axios.post("https://multatendiment-aquecimento.ybrsom.easypanel.host/warmup/start-conversation", selectedInstances)
console.log(response.data,'teste')
    return response.data
  } catch (error: any) {
    console.error("Erro ao iniciar conversa:", error.response?.data || error.message)
    throw new Error(error.response?.data?.message || error.message)
  }
}
export async function startConversationAction1(selectedInstances: Instance[]) {
  try {
    const response = await axios.post("https://multatendiment-aquecimento.ybrsom.easypanel.host/warmup/start-conversation", {
      selectedInstances,
    })

    return response.data
  } catch (error: any) {
    console.error("Erro ao iniciar conversa:", error.response?.data || error.message)
    throw new Error(error.response?.data?.message || error.message)
  }
}

export async function stopConversationAction() {
  try {
    const response = await apiInstances.post("/warmup/stop-conversation")
    return response.data
  } catch (error: any) {
    console.error("Erro ao parar conversa:", error.response?.data || error.message)
    throw new Error(error.response?.data?.message || error.message)
  }
}

export async function getWhatsappInstances(apiUrl: string, apiKey: string): Promise<InstanceEvo[]> {
  try {
    const response = await axios.get(`${apiUrl}/instance/fetchInstances`, {
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey, // chave da API
      },
    })
    // console.log(response.data,'dados')
    // Ajuste conforme o retorno real da API
    return response.data || []
  } catch (error: any) {
    console.error("Erro ao buscar instâncias:", error.response?.data || error.message)
    throw new Error(error.response?.data?.message || error.message)
  }
}

//SELECAO DAS RUNING
export async function getRunningStatus() {
  try {
    const response = await axios.get("https://multatendiment-aquecimento.ybrsom.easypanel.host/instances/instance/running")

    console.log("[v0] getRunningStatus response:", response.data)
    return response.data
  } catch (err) {
    console.error("[v0] Error in getRunningStatus:", err)
    return []
  }
}
