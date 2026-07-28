import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import {
  Box,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

type ControlledPasswordInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  userName?: string;
  label?: string;
};

export function ControlledPasswordInput<T extends FieldValues>({
  control,
  name,
  userName = "",
  label = "Senha",
}: ControlledPasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={"" as any}
      render={({ field, fieldState }) => {
        const password = field.value ?? "";

        const rules = {
          length: password.length >= 12,
          lowercase: /[a-z]/.test(password),
          uppercase: /[A-Z]/.test(password),
          number: /\d/.test(password),
          symbol: /[^A-Za-z0-9]/.test(password),
          noName:
            !userName ||
            !password
              .toLowerCase()
              .includes(userName.toLowerCase()),
        };

        const score = Object.values(rules).filter(Boolean).length;
        const progress = (score / 6) * 100;

        const color =
          score <= 2
            ? "error"
            : score <= 4
            ? "warning"
            : "success";

        const strength =
          score <= 2
            ? "Fraca"
            : score <= 4
            ? "Média"
            : "Forte";

        const Rule = ({
          valid,
          text,
        }: {
          valid: boolean;
          text: string;
        }) => (
          <Stack
            spacing={1}
            component='div'
            direction="row"
            sx={{
              alignItems: "center"
            }}
          >
            {valid ? (
              <CheckCircleRoundedIcon
                color="success"
                fontSize="small"
              />
            ) : (
              <CancelRoundedIcon
                color="disabled"
                fontSize="small"
              />
            )}

            <Typography
              variant="body2"
              color={
                valid
                  ? "success.main"
                  : "text.secondary"
              }
            >
              {text}
            </Typography>
          </Stack>
        );

        return (
          <Box>
            <TextField
              {...field}
              fullWidth
              label={label}
              type={showPassword ? "text" : "password"}
              value={password}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box component="section" sx={{mt: 1}}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  mb: 1
                }}
              >
                <Typography variant="body2">
                  Força da senha
                </Typography>

                <Typography
                  component={'span'}
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                >
                  {strength}
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={progress}
                color={color}
                sx={{
                  height: 8,
                  borderRadius: 999,
                  mb: 2,
                }}
              />

              <Stack spacing={0.5}>
                <Rule
                  valid={rules.length}
                  text="Pelo menos 12 caracteres"
                />

                <Rule
                  valid={rules.lowercase}
                  text="Uma letra minúscula"
                />

                <Rule
                  valid={rules.uppercase}
                  text="Uma letra maiúscula"
                />

                <Rule
                  valid={rules.number}
                  text="Um número"
                />

                <Rule
                  valid={rules.symbol}
                  text="Um símbolo (! @ # $ % ^ & * ?)"
                />

                <Rule
                  valid={rules.noName}
                  text="Não conter seu nome"
                />
              </Stack>
            </Box>
          </Box>
        );
      }}
    />
  );
}