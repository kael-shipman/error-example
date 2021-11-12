Error Sample
============================================================================================

This repo is the most minimal example I could come up with to demonstrate an error I'm running into.

See stack overflow for details.

To test:

1. clone the repo
2. run `npm install`
3. run `tsc`. Note that the repo compiles fine.
4. run `npm t`. Note that the test fails with the error `Type instantiation is excessively deep and
   possibly infinite.`
5. Now edit `src/Types.ts`: comment out block #1 and uncomment block #2. Note that block #2 is a
   direct copy/paste of the code defined in `@wymp/weenie-framework:/src/Types.ts` that is causing
   the problem.
6. run `tsc`. Note that the repo compiles fine.
7. run `npm t`. Note that the test executes fine.

Question: Why does the test fail in the first scenario, even though `tsc` runs fine?

