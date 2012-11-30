(ns dinosource.test.solution
  (:use clojure.test 
        dinosource.solution))

(deftest test-process-solution
  (testing "just on"
    (let [code {:code [{:id :foo
                       	:name "on"
                        :params [5 7]}]}
          solution (process-solution code 0)
          step (first (:steps solution))]
      (is (= (:highlight step) [:foo]))
      (is (= (:changes step) [{:x 5
                               :y 7
                               :state :on}]))
      (is (= (:errors step) []))
      (is (= (:success solution) true))))

  (testing "on with error"
    (let [code {:code [{:id :foo
                       	:name "on"
                        :params ["" 7]}]}
          solution (process-solution code 0)
          step (first (:steps solution))]
      (is (= (:highlight step) [:foo]))
      (is (= (:changes step) []))
      (is (= (:errors step) ["You need to enter a number in both boxes"]))
      (is (= (:success solution) false))))

  (testing "on twice"
    (let [code {:code [{:id :foo1
                       	:name "on"
                        :params [5 7]}
                       {:id :foo2
                       	:name "on"
                        :params [5 7]}]}
          solution (process-solution code 0)
          step1 (first (:steps solution))
          step2 (nth (:steps solution) 1)]
      (is (= (:highlight step1) [:foo1]))
      (is (= (:changes step1) [{:x 5
                                :y 7
                                :state :on}]))
      (is (= (:errors step1) []))
      (is (= (:highlight step2) [:foo2]))
      (is (= (:changes step2) [{:x 5
                                :y 7
                                :state :on}]))
      (is (= (:errors step2) []))
      (is (= (:success solution) true)))))