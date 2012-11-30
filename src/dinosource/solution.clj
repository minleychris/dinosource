(ns dinosource.solution
  (:use dinosource.exercise)
  (:require [dinosource.library :as library]))

(defn parse-block [{id :id
                   	function :name
                   	params :params}]
  (let [{changes :changes errors :errors} (apply (library/get-function (keyword function)) params)]
    {:highlight [id]
     :changes changes
     :errors errors}))

(defn expectedz? [actual expected]
  (and (= (:name actual) (:name expected))
       (= (:params actual) (:params expected))))

(defn expected-reducer [expected]
  (fn [index el]
    (if (not (= index (count expected)))
      (if (expectedz? el (nth expected index))
        (inc index)
        index)
      index)))

(defn assess-success [code expected]
  (let [result (reduce (expected-reducer expected) 0 code)]
    (if (= result (count expected))
      true
      false)))

(defn parse [code expected]
  {:steps (map parse-block code)
   :success (assess-success code expected)})

(defn process-solution [{code :code} id]
  (parse code (:expected (first (get-exercise id)))))