import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { 
  Box, 
  Grid 
} from "@mui/material";

import { 
  optionsQueryListPaymentInstallments 
} from "@/features/payment/api/queryListPaymentInstallments";
import InstallmentDetail from "@/features/payment/components/InstallmentDetail";
import HeaderPage from "@/components/HeaderPage";

import { type PaymentInstallment } from '@shared/types/paymentInstallments'

export default function PaymentDetails() {

  const { id } = useParams();

  const { 
    data: listPaymentInstallments,
    isSuccess
  } = useQuery(
    optionsQueryListPaymentInstallments(id!)
  )
  
  return (
    <>
      <HeaderPage 
        title="Gerenciar as parcelas deste pagamento:"
      />
      
      <Box component="section" sx={{
        p: 4, 
        display: 'flex',
        flexDirection: "column",
      }}>
        { isSuccess && 
          listPaymentInstallments.map( ( paymentInstallment: PaymentInstallment ) => {
            return (
              <Grid key={paymentInstallment.id} >
                <InstallmentDetail data={paymentInstallment} color={
                  paymentInstallment.installment % 2 == 0 ? "grey.100" : undefined
                } />
              </Grid>
            )
          } 
        )}
      </Box>
    </>
  )
}