import { parser } from "./syntax.grammar";
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

export const zigLanguage = LRLanguage.define({
  parser: parser.configure({
    // TODO: correct config here
    props: [
      styleTags({
        "Identifier IdentifierSuffix Constant ConstantSuffix": t.variableName,
        "InstanceVariable ClassVariable GlobalVariable": t.variableName,
        "Integer Float Copmlex Rational UnaryLiteral": t.number,
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        Comment: t.comment,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: "#" },
  },
});

export function zig() {
  return new LanguageSupport(zigLanguage);
}
