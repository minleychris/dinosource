(ns dinosource.solution
  (:require [dinosource.library :as library]))

(defn parse-block [{id :id
                   	function :name
                   	params :params}]
  (let [{changes :changes errors :errors} (apply (library/get-function (keyword function)) params)]
    {:highlight [id]
     :changes changes
     :errors errors}))


(defn parse [code]
  {:steps (map parse-block code)})

(defn process-solution [{code :code}]
  (parse code))