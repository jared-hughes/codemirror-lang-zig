import { parser } from "./syntax.grammar";
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

const kwsString =
  "pub test comptime export extern inline noinline threadlocal " +
  "usingnamespace fn const var nosuspend suspend defer errdefer else or and " +
  "break continue resume return async error anyframe unreachable packed " +
  "switch asm volatile linksection addrspace callconv noalias anytype if " +
  "while for orelse catch try await allowzero align struct opaque enum union word";

const kws = kwsString.split(" ");

export const zigLanguage = LRLanguage.define({
  parser: parser.configure({
    // TODO: correct config here
    props: [
      styleTags({
        Identifier: t.variableName,
        kwsString: t.keyword,
        BuiltinIdentifier: t.standard(t.variableName),
        StringLiteral: t.string,
        Float: t.float,
        Integer: t.integer,
        CharLiteral: t.character,
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        "DocComment ContainerDocComment LineComment": t.comment,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: "//" },
    autocomplete: kws.map((kw) => ({ label: kw, type: "keyword" })),
  },
});

export function zig() {
  return new LanguageSupport(zigLanguage);
}
