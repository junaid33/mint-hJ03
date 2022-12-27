import { z } from "zod";
import { isHexadecimal } from "../utils/isHexadecimal";

export const anchorsSchema = z
  .object({
    name: z.string().trim().min(1, "Anchor name is missing."),
    url: z.string().trim().min(1, "Anchor URL is missing."),
    icon: z.string().optional(),
    color: z
      .union([
        z
          .string()
          .refine(
            (val) => isHexadecimal(val),
            "Anchor color must be a hexadecimal color."
          ),
        z
          .object({
            from: z
              .string()
              .refine(
                (val) => isHexadecimal(val),
                "Anchor color.from must be a hexadecimal color."
              ),
            via: z
              .string()
              .refine(
                (val) => isHexadecimal(val),
                "Anchor color.via must be undefined or a hexadecimal color."
              )
              .optional(),
            to: z
              .string()
              .refine(
                (val) => isHexadecimal(val),
                "Anchor color.to must be a hexadecimal color."
              ),
          })
          .strict(
            "Anchors with gradient colors can only have properties from, via, and to with valid hexadecimal colors."
          ),
      ])
      .optional(),
    isDefaultHidden: z.boolean().optional(),
    version: z.string().optional(),
  })
  .array()
  .optional();
