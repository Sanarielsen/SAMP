import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import { Box, Grid } from "@mui/material";

import { optionsQueryGetOrderType } from "@/features/admin/api/queryGetOrderType";
import { optionsQueryGetPaymentMethod } from "@/features/admin/api/queryGetPaymentMethod";
import { useMutationPostOrderType } from "@/features/admin/api/mutationPostOrderType";
import { useMutationPatchOrderType } from "@/features/admin/api/mutationUpdateOrderType";
import { useMutationPostPaymentMethod } from "@/features/admin/api/mutationPostPaymentMethod";
import { optionsQueryListOrderTypesAsOptions } from "@/api/queryListOrderTypeAsOptions";
import { optionsQueryListPaymentMethodOptions } from "@/api/queryListPaymentMethods";
import { useMutationDeletePaymentMethod } from "@/features/admin/api/mutationDeletePaymentMethod";
import { useMutationDeleteOrderType } from "@/features/admin/api/mutationDeleteOrderType";
import { useMutationPatchPaymentMethod } from "@/features/admin/api/mutationUpdatePaymentMethod";
import AccordionGroup from "@/components/AccordionGroup";
import HeaderPage from "@/components/HeaderPage";
import ModalConfirmation from "@/components/ModalConfirmation";
import ModalVariableEntity from "@/components/ModalVariableEntity";
import ToastContainer from "@/components/Toast";
import {
  updatePaymentMethodSchema,
  type UpdatePaymentMethodFormInput,
  type UpdatePaymentMethodFormOutput,
} from "@/features/admin/schema/managePaymentMethod";
import { 
  manageOrderTypeSchema, 
  type ManageOrderTypeFormInput, 
  type ManageOrderTypeFormOutput 
} from "@/features/admin/schema/manageOrderType";
import { updateRowPaymentMethodFields } from "@/features/admin/utils/updateRowPaymentMethodFields";
import { manageRowOrderTypeFields } from "@/features/admin/utils/manageRowOrderTypeFields";

import type { 
  OrderTypeCreateDTO, 
  OrderTypeUpdateDTO 
} from "@shared/types/orderType";
import type { 
  PaymentMethodCreateDTO, 
  PaymentMethodUpdateDTO 
} from "@shared/types/paymentMethod";


export default function ManageVariables() {
  const queryClient = useQueryClient();

  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [titleModalConfirmation, setTitleModalConfirmation] = useState("")
  const [descriptionModalConfirmation, setDescriptionModalConfirmation] = useState("")
  const [openModalManage, setOpenModalManage] = useState("");
  const [entitySelected, setEntitySelected] = useState("");
  const [clickedOptionId, setClickedOptionId] = useState<number>();
  const [openToast, setOpenToast] = useState("");

  const {
    data: listPaymentMethodOptions,
    isSuccess: isSuccessPaymentMethodOptions,
    isLoading: isLoadingPaymentMethodAsOptions,
    isError: isErrorPaymentMethodAsOptions,
    refetch: refetchListPaymentMethod,
  } = useQuery(
    optionsQueryListPaymentMethodOptions()
  );

  const {
    data: listOrderTypesAsOptions,
    isSuccess: isSuccessOrderTypesAsOptions,
    isLoading: isLoadingOrderTypesAsOptions,
    isError: isErrorOrderTypesAsOptions,
    refetch: refetchListOrderType,
  } = useQuery(
    optionsQueryListOrderTypesAsOptions()
  );

  const {
    data: getPaymentMethod,
  } = useQuery(
    optionsQueryGetPaymentMethod(clickedOptionId, entitySelected === "paymentMethod")
  );

  const {
    data: getOrderType,
  } = useQuery(
    optionsQueryGetOrderType(clickedOptionId, entitySelected === "orderType")
  );

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);

    if (result === "success_payment_method_created") {
      setTimeout(() => {
        setOpenModalManage("");

        mutationPostPaymentMethod.reset();

        queryClient.invalidateQueries({
          queryKey: [
            "payment-method-as-options",
          ],
        });
      }, 5000);
    }
    else if (result === "success_payment_method_updated") {
      setTimeout(() => {
        setOpenModalManage("");

        mutationPatchPaymentMethod.reset();

        queryClient.invalidateQueries({
          queryKey: [
            "payment-method-as-options",
          ],
        });

        setClickedOptionId(null);
      }, 5000);
    }
    else if (result === "success_payment_method_deleted") {
      setOpenModalManage("");

      mutationDeletePaymentMethod.reset();

      queryClient.invalidateQueries({
        queryKey: ["payment-method-as-options"],
      });

      setClickedOptionId(null);
    }
    else if (result === "success_order_type_created") {
      setTimeout(() => {
        setOpenModalManage("");

        mutationPostOrderType.reset();

        queryClient.invalidateQueries({
          queryKey: ["order-type-as-options"],
        });
      }, 5000);
    }
    else if (result === "success_order_type_updated") {
      setTimeout(() => {
        setOpenModalManage("");

        mutationPatchOrderType.reset();

        queryClient.invalidateQueries({
          queryKey: ["order-type-as-options"],
        });

        setClickedOptionId(null);
      }, 5000);
    }
    else if (result === "success_order_type_deleted") {
      setOpenModalManage("");

      mutationDeleteOrderType.reset();

      queryClient.invalidateQueries({
        queryKey: ["order-type-as-options"],
      });

      setClickedOptionId(null);
    }
    
  }

  const mutationPostPaymentMethod =
    useMutationPostPaymentMethod({
      onSuccess: () => {
        setOpenToast("");
        executeActionAfterRequest("success_payment_method_created");
      },

      onError: () => {
        setOpenToast("error_payment_method_created");
      },
    });

  const mutationPatchPaymentMethod =
    useMutationPatchPaymentMethod({
      onSuccess: () => {
        setOpenToast("");
        executeActionAfterRequest("success_payment_method_updated");
      },

      onError: () => {
        setOpenToast("error_payment_method_updated");
      },
    });

  const mutationPostOrderType =
    useMutationPostOrderType({
      onSuccess: () => {
        setOpenToast("");
        executeActionAfterRequest("success_order_type_created");
      },

      onError: () => {
        setOpenToast("error_order_type_created");
      },
    });

  const mutationPatchOrderType =
    useMutationPatchOrderType({
      onSuccess: () => {
        setOpenToast("");
        executeActionAfterRequest("success_order_type_updated");
      },

      onError: () => {
        setOpenToast("error_order_type_updated");
      },
    });

  const mutationDeletePaymentMethod =
    useMutationDeletePaymentMethod({
      onSuccess: () => {
        setOpenToast("");
        executeActionAfterRequest("success_payment_method_deleted");
      },

      onError: () => {
        setOpenToast("error_payment_method_deleted");
      },
    });

  const mutationDeleteOrderType =
    useMutationDeleteOrderType({
      onSuccess: () => {
        setOpenToast("");
        executeActionAfterRequest("success_order_type_deleted");
      },

      onError: () => {
        setOpenToast("error_order_type_deleted");
      },
    });
  
  function handleAdd(entity: string) {
    
    switch (entity) {
      case "paymentMethod":
        setOpenModalManage(
          "create_payment_method"
        );
        break;

      case "orderType":
        setOpenModalManage(
          "create_order_type"
        );
        break;
    }
  }

  function handleUpdate(
    id: number,
    entity: string
  ) {
    setClickedOptionId(id);
    setEntitySelected(entity)

    switch (entity) {
      case "paymentMethod":
        setOpenModalManage(
          "update_payment_method"
        );
        break;

      case "orderType":
        setOpenModalManage(
          "update_order_type"
        );
        break;
    }
  }

  function handleDelete(id: number, entity: string) {
    setEntitySelected(entity);
    switch (entity) {
      case "paymentMethod":
        setTitleModalConfirmation("Desativar o método de pagamento");
        setDescriptionModalConfirmation("Tem certeza que gostaria de desativar este método de pagamento atual? Essa operacão não é inversivel.");
      break;

      case "orderType":
        setTitleModalConfirmation("Desativar o tipo de ordem de serviço");
        setDescriptionModalConfirmation("Tem certeza que gostaria de desativar este tipo de ordem de serviço atual? Essa operacão não é inversivel.");
      break;
    }
    
    setClickedOptionId(id);
    setOpenModalConfirmation(true);
  }

  function handleDeactivateEntityRow(action: boolean){

    setOpenModalConfirmation(false)
    
    if (!action || !clickedOptionId) return

    switch (entitySelected) {
      case "paymentMethod":
        mutationDeletePaymentMethod.mutate(clickedOptionId)
        refetchListPaymentMethod()
      break;

      case "orderType":
        mutationDeleteOrderType.mutate(clickedOptionId)
        refetchListOrderType()
      break;
    }
  }

  const formCreatePaymentMethod = useForm<
    UpdatePaymentMethodFormInput,
    undefined,
    UpdatePaymentMethodFormOutput
  >({
    resolver: zodResolver(updatePaymentMethodSchema),
  });

  const formUpdatePaymentMethod = useForm<
    UpdatePaymentMethodFormInput,
    undefined,
    UpdatePaymentMethodFormOutput
  >({
    defaultValues: {
      name: getPaymentMethod?.name ?? "",
      order: getPaymentMethod?.order ?? 0,
      observation: getPaymentMethod?.observation ?? "",
    },
    resolver: zodResolver(updatePaymentMethodSchema),
  });

  const formCreateOrderType = useForm<
    ManageOrderTypeFormInput,
    undefined,
    ManageOrderTypeFormOutput
  >({
    resolver: zodResolver(manageOrderTypeSchema),
  });

  const formUpdateOrderType = useForm<
    ManageOrderTypeFormInput,
    undefined,
    ManageOrderTypeFormOutput
  >({
    defaultValues: {
      title: getOrderType?.title ?? "",
      description: getOrderType?.description ?? "",
      observation: getOrderType?.observation ?? "",
    },
    resolver: zodResolver(manageOrderTypeSchema),
  });

  useEffect(() => {
    switch (entitySelected) {
      case "paymentMethod":
        if (!getPaymentMethod) return;

        formUpdatePaymentMethod.reset({
          name: getPaymentMethod.name,
          order: getPaymentMethod.order,
          observation:
            getPaymentMethod.observation ?? "",
        });
      break;

      case "orderType":
        if (!getOrderType) return;
        formUpdateOrderType.reset({
          title: getOrderType.title,
          description: getOrderType.description,
          order: getOrderType.order,
          observation:
            getOrderType.observation ?? "",
        });
      break;
    }
  }, [
    getPaymentMethod,
    getOrderType,
    formUpdatePaymentMethod,
    formUpdateOrderType,
  ]);

  const stateListMethodOptions =
    isLoadingPaymentMethodAsOptions
      ? "LOADING"
      : isErrorPaymentMethodAsOptions
        ? "ERROR"
        : listPaymentMethodOptions?.length ===
            0
          ? "EMPTY"
          : "SUCCESS";

  const stateListOrderTypeAsOptions =
    isLoadingOrderTypesAsOptions
      ? "LOADING"
      : isErrorOrderTypesAsOptions
        ? "ERROR"
        : listOrderTypesAsOptions?.length ===
            0
          ? "EMPTY"
          : "SUCCESS";

  const onSubmitPaymentMethodCreate: SubmitHandler<
    UpdatePaymentMethodFormInput
  > = async (data) => {
    const payload: PaymentMethodCreateDTO = {
      name: data.name,
      order: Number(data.order),
      observation: data.observation ?? undefined,
    };

    mutationPostPaymentMethod.mutate(payload);
  };

  const onSubmitPaymentMethodUpdate: SubmitHandler<
    UpdatePaymentMethodFormInput
  > = async (data) => {

    const payload: PaymentMethodUpdateDTO = {
      id: getPaymentMethod!.id,
    };

    if (
      data.name !== getPaymentMethod!.name
    ) {
      payload.name = data.name;
    }

    if (
      data.order !== getPaymentMethod!.order
    ) {
      payload.order = Number(data.order);
    }

    if (
      data.observation !==
      getPaymentMethod!.observation
    ) {
      payload.observation =
        data.observation;
    }

    mutationPatchPaymentMethod.mutate(
      payload
    );
  };

  const onSubmitOrderTypeCreate: SubmitHandler<ManageOrderTypeFormInput> = async (data) => {
    const payload: OrderTypeCreateDTO = {
      ...data,
      order: Number(data.order) ?? 0,
      observation: data.observation ?? undefined,
    };

    mutationPostOrderType.mutate(payload);
  };

  const onSubmitOrderTypeUpdated: SubmitHandler<
    ManageOrderTypeFormInput
  > = async (data) => {
    
    const payload: OrderTypeUpdateDTO = {
      id: getOrderType!.id,
    };

    if (
      data.title !== getOrderType!.title
    ) {
      payload.title = data.title;
    }

    if (
      data.description !== getOrderType!.description
    ) {
      payload.description = data.description;
    }

    if (
      data.order !== getOrderType!.order
    ) {
      payload.order = Number(data.order);
    }

    if (
      data.observation !==
      getOrderType!.observation
    ) {
      payload.observation =
        data.observation;
    }

    mutationPatchOrderType.mutate(payload);
  };

  return (
    <Box
      component="section"
      sx={{ py: 2 }}
    >
      <HeaderPage
        title="Gerenciamento das varíaveis"
      />

      <Box
        component="section"
        sx={{ py: 2, px: 4 }}
      >
        <Grid
          container
          spacing={4}
        >
          <Grid size={{ xs: 12, sm: 6 }}>
            <AccordionGroup
              state={stateListMethodOptions}
              title="Meios de pagamento"
              entity="paymentMethod"
              values={
                isSuccessPaymentMethodOptions
                  ? listPaymentMethodOptions
                  : []
              }
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <AccordionGroup
              state={stateListOrderTypeAsOptions}
              title="Tipo de ordem de servico"
              entity="orderType"
              values={
                isSuccessOrderTypesAsOptions
                  ? listOrderTypesAsOptions
                  : []
              }
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </Grid>
        </Grid>
      </Box>

      {openModalManage === "create_payment_method" && (
        <ModalVariableEntity
          open={openModalManage === "create_payment_method"}
          action="ADD"
          title="Adicionando um método de pagamento"
          fields={updateRowPaymentMethodFields()}
          control={formCreatePaymentMethod.control}
          errors={formCreatePaymentMethod.formState.errors}
          isSubmitting={
            mutationPostPaymentMethod.isSuccess ||
            mutationPostPaymentMethod.isPending
          }
          handleSubmitModal={
            formCreatePaymentMethod.handleSubmit(onSubmitPaymentMethodCreate)
          }
          handleClose={() => setOpenModalManage("")}
        />
      )}

      {openModalManage === "update_payment_method" && getPaymentMethod && (
        <ModalVariableEntity
          open={openModalManage === "update_payment_method"}
          action="UPDATE"
          title="Atualizando o método de pagamento"
          fields={updateRowPaymentMethodFields()}
          control={formUpdatePaymentMethod.control}
          errors={formUpdatePaymentMethod.formState.errors}
          isSubmitting={
            mutationPatchPaymentMethod.isSuccess ||
            mutationPatchPaymentMethod.isPending
          }
          handleSubmitModal={
            formUpdatePaymentMethod.handleSubmit(onSubmitPaymentMethodUpdate)
          }
          handleClose={() => setOpenModalManage("")}
        />
      )}

      {openModalManage === "create_order_type" && (
        <ModalVariableEntity
          open={openModalManage === "create_order_type"}
          action="ADD"
          title="Adicionando um tipo de ordem de serviço"
          fields={manageRowOrderTypeFields()}
          control={formCreateOrderType.control}
          errors={formCreateOrderType.formState.errors}
          isSubmitting={
            mutationPostOrderType.isSuccess ||
            mutationPostOrderType.isPending
          }
          handleSubmitModal={
            formCreateOrderType.handleSubmit(onSubmitOrderTypeCreate)
          }
          handleClose={() => setOpenModalManage("")}
        />
      )}

      {openModalManage === "update_order_type" && getOrderType && (
        <ModalVariableEntity
          open={openModalManage === "update_order_type"}
          action="UPDATE"
          title="Atualizando um tipo de ordem de serviço"
          fields={manageRowOrderTypeFields()}
          control={formUpdateOrderType.control}
          errors={formUpdateOrderType.formState.errors}
          isSubmitting={
            mutationPatchOrderType.isSuccess ||
            mutationPatchOrderType.isPending
          }
          handleSubmitModal={
            formUpdateOrderType.handleSubmit(onSubmitOrderTypeUpdated)
          }
          handleClose={() => setOpenModalManage("")}
        />
      )}

      {/* //Payment method */}
      <ToastContainer
        open={openToast === "success_payment_method_created"}
        message="Meio de pagamento criado com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "success_payment_method_updated"}
        message="Meio de pagamento atualizado com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error_payment_method_created"}
        message="Ocorreu um erro ao criar esse meio de pagamento."
        severity="error"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error_payment_method_updated"}
        message="Ocorreu um erro ao atualizar esse meio de pagamento."
        severity="error"
        onClose={() => setOpenToast("")}
      />

      {/* // Order Type */}
      <ToastContainer
        open={openToast === "success_order_type_created"}
        message="Tipo de ordem de serviço criada com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "success_order_type_updated"}
        message="Tipo de ordem de serviço atualizada com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error_order_type_created"}
        message="Ocorreu um erro ao criar essa tipo de ordem de serviço."
        severity="error"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error_order_type_updated"}
        message="Ocorreu um erro ao atualizar essa tipo de ordem de serviço."
        severity="error"
        onClose={() => setOpenToast("")}
      />

      {/* // Others */}
      <ToastContainer
        open={openToast === "success_payment_method_deleted"}
        message="Meio de pagamento desativado com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "success_order_type_deleted"}
        message="Tipo de ordem de serviço desativado com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error_payment_method_deleted"}
        message="Ocorreu um erro ao desativar esse método de pagamento."
        severity="error"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error_order_type_deleted"}
        message="Ocorreu um erro ao desativar essa tipo de ordem de serviço."
        severity="error"
        onClose={() => setOpenToast("")}
      />

      <ModalConfirmation
        open={openModalConfirmation}
        title={titleModalConfirmation}
        description={descriptionModalConfirmation}
        handleClose={() => setOpenModalConfirmation(false)}
        handleAnswer={handleDeactivateEntityRow}
      />

    </Box>
  );
}