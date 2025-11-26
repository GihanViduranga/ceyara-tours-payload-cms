// Mock React compiler-runtime for React 18 compatibility
// This provides the missing compiler-runtime that Payload CMS 3.0.0 expects

import * as React from 'react'

// React 19 compiler functions that Payload CMS expects
export const c = (fn) => {
  // Mock implementation - just return the function
  return fn
}

export const useMemoCache = () => {
  // Mock implementation for React 18
  return []
}

export const useMemo = (factory, deps) => {
  // Fallback to React's useMemo
  return React.useMemo(factory, deps)
}

export const useCallback = (callback, deps) => {
  // Fallback to React's useCallback
  return React.useCallback(callback, deps)
}

export const useState = (initialState) => {
  // Fallback to React's useState
  return React.useState(initialState)
}

export const useEffect = (effect, deps) => {
  // Fallback to React's useEffect
  return React.useEffect(effect, deps)
}

export const useRef = (initialValue) => {
  // Fallback to React's useRef
  return React.useRef(initialValue)
}

export const useContext = (context) => {
  // Fallback to React's useContext
  return React.useContext(context)
}

export const useReducer = (reducer, initialState, init) => {
  // Fallback to React's useReducer
  return React.useReducer(reducer, initialState, init)
}

export const useLayoutEffect = (effect, deps) => {
  // Fallback to React's useLayoutEffect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useLayoutEffect(effect, deps)
}

export const useImperativeHandle = (ref, createHandle, deps) => {
  // Fallback to React's useImperativeHandle
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useImperativeHandle(ref, createHandle, deps)
}

export const useDebugValue = (value, formatter) => {
  // Fallback to React's useDebugValue
  return React.useDebugValue(value, formatter)
}

export const useDeferredValue = (value) => {
  // Fallback to React's useDeferredValue
  return React.useDeferredValue(value)
}

export const useTransition = () => {
  // Fallback to React's useTransition
  return React.useTransition()
}

export const useId = () => {
  // Fallback to React's useId
  return React.useId()
}

export const useSyncExternalStore = (subscribe, getSnapshot, getServerSnapshot) => {
  // Fallback to React's useSyncExternalStore
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export const useInsertionEffect = (effect, deps) => {
  // Fallback to React's useInsertionEffect
  return React.useInsertionEffect(effect, deps)
}

// Export all as default
const reactCompilerRuntime = {
  c,
  useMemoCache,
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
  useContext,
  useReducer,
  useLayoutEffect,
  useImperativeHandle,
  useDebugValue,
  useDeferredValue,
  useTransition,
  useId,
  useSyncExternalStore,
  useInsertionEffect,
}

export default reactCompilerRuntime
