## description

Preprocessor directives, such as `#define` and `#ifdef`, are typically used to make source programs easy to change and easy to compile in different execution environments. Directives in the source file tell the preprocessor to take specific actions. For example, the preprocessor can replace tokens in the text, insert the contents of other files into the source file, or suppress compilation of part of the file by removing sections of text. Preprocessor lines are recognized and carried out before macro expansion. Therefore, if a macro expands into something that looks like a preprocessor command, it isn't recognized by the preprocessor.

Preprocessor statements use the same character set as source file statements, with the exception that escape sequences aren't supported. The character set used in preprocessor statements is the same as the execution character set. The preprocessor also recognizes negative character values.

The preprocessor recognizes the following directives:

[`#define`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-define-directive-c-cpp?view=msvc-170)
[`#elif`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-if-hash-elif-hash-else-and-hash-endif-directives-c-cpp?view=msvc-170)
[`#else`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-if-hash-elif-hash-else-and-hash-endif-directives-c-cpp?view=msvc-170)
[`#endif`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-if-hash-elif-hash-else-and-hash-endif-directives-c-cpp?view=msvc-170)

[`#error`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-error-directive-c-cpp?view=msvc-170)
[`#if`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-if-hash-elif-hash-else-and-hash-endif-directives-c-cpp?view=msvc-170)
[`#ifdef`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-ifdef-and-hash-ifndef-directives-c-cpp?view=msvc-170)
[`#ifndef`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-ifdef-and-hash-ifndef-directives-c-cpp?view=msvc-170)

[`#import`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-import-directive-cpp?view=msvc-170)
[`#include`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-include-directive-c-cpp?view=msvc-170)
[`#line`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-line-directive-c-cpp?view=msvc-170)

[`#pragma`](https://learn.microsoft.com/en-us/cpp/preprocessor/pragma-directives-and-the-pragma-keyword?view=msvc-170)
[`#undef`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-undef-directive-c-cpp?view=msvc-170)
[`#using`](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-using-directive-cpp?view=msvc-170)

The number sign (`#`) must be the first nonwhite-space character on the line containing the directive. White-space characters can appear between the number sign and the first letter of the directive. Some directives include arguments or values. Any text that follows a directive (except an argument or value that is part of the directive) must be preceded by the single-line comment delimiter (`//`) or enclosed in comment delimiters (`/* */`). Lines containing preprocessor directives can be continued by immediately preceding the end-of-line marker with a backslash (`\`).

Preprocessor directives can appear anywhere in a source file, but they apply only to the rest of the source file, after they appear.

## link

- https://www.runoob.com/cplusplus/cpp-preprocessor.html

- https://learn.microsoft.com/en-us/cpp/preprocessor/preprocessor-directives?view=msvc-170
