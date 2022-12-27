import { z } from "zod";
import { isHexadecimal } from "../utils/isHexadecimal";

export const colorsSchema = z
  .object({
    primary: z
      .string()
      .min(1, "Color primary is missing")
      .refine(
        (val) => isHexadecimal(val),
        "Primary color must be a hexadecimal value"
      ),
    light: z
      .string()
      .refine(
        (val) => isHexadecimal(val),
        "Light color must be a hexadecimal value"
      )
      .optional(),
    dark: z
      .string()
      .refine(
        (val) => isHexadecimal(val),
        "Dark color must be a hexadecimal value"
      )
      .optional(),
    ultraLight: z
      .string()
      .refine(
        (val) => isHexadecimal(val),
        "UltraLight color must be a hexadecimal value"
      )
      .optional(),
    ultraDark: z
      .string()
      .refine(
        (val) => isHexadecimal(val),
        "UltraDark color must be a hexadecimal value"
      )
      .optional(),
    background: z
      .object({
        light: z
          .string()
          .refine(
            (val) => isHexadecimal(val),
            "Background light color must be a hexadecimal value"
          )
          .optional(),
        dark: z
          .string()
          .refine(
            (val) => isHexadecimal(val),
            "Background dark color must be a hexadecimal value"
          )
          .optional(),
      })
      .optional(),
  })
  .strict("Some of the colors in mint.json are invalid");
