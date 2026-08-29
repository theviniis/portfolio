import axios from "axios";
import type { SendContactSchemaType } from "./schemas";
import { toast } from "sonner";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export const sendContactEmail = async (data: SendContactSchemaType) => {
  try {
    const response = await axios.post(FORMSPREE_ENDPOINT, data);

    if (response.status !== 200) {
      throw new Error("Falha ao enviar o formulário");
    }

    toast.success("Email encaminhado com sucesso", {
      position: "bottom-right",
    });
  } catch {
    toast.error("Não foi possível enviar o email", {
      position: "bottom-right",
    });
  }
};
