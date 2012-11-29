(ns dinosource.test.solution
  (:use clojure.test 
        dinosource.solution))

(deftest test-process-solution
  (testing "just on"
    (let [code {:code [{:id :foo
                       	:name "on"
                        :params [1 2]}]}
          solution (process-solution code)
          step (first (:steps solution))]
      (is (= (:highlight step) [:foo]))
      (is (= (:changes step) [{:x 1
                               :y 2
                               :state :on}]))))
  (testing "just on"
    (let [code {:code [{:id :foo1
                       	:name "on"
                        :params [1 2]}
                       {:id :foo2
                       	:name "on"
                        :params [1 2]}]}
          solution (process-solution code)
          step1 (first (:steps solution))
          step2 (nth (:steps solution) 1)]
      (is (= (:highlight step1) [:foo1]))
      (is (= (:changes step1) [{:x 1
                                :y 2
                                :state :on}]))
      (is (= (:highlight step2) [:foo2]))
      (is (= (:changes step2) [{:x 1
                                :y 2
                                :state :on}])))))