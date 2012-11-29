(ns dinosource.solution)

(def library
  {:on (fn [x y] [{:x x
                  :y y
                  :state :on}])})

(defn get-function [name]
  (name library))

(defn parse-block [{id :id
                   	function :function
                   	params :params}]
  {:highlight [id]
   :changes (apply (get-function (keyword function)) params)})


(defn parse [code]
  {:steps (map parse-block code)})

(defn process-solution [{code :code}]
  (parse code))