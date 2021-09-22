// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// using polyfill to allow support for string.prototype.replaceAll method which is note explicitly supported in
// node version 8.5 <
import replaceAllInserter from 'string.prototype.replaceall';

replaceAllInserter.shim();