(ns dinosource.solution
  (:require [dinosource.library :as library]))

(defn parse-block [{id :id
                   	function :name
                   	params :params}]
  {:highlight [id]
   :changes (apply (library/get-function (keyword function)) params)})


(defn parse [code]
  {:steps (map parse-block code)})

(defn process-solution [{code :code}]
  (parse code))