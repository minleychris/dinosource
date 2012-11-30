(ns dinosource.test.handler
  (:use clojure.test
        ring.mock.request  
        dinosource.handler))

(deftest test-app
  (testing "solutions 1"
    (let [response (app (body (request :post "/solutions/0") "{
  \"code\": [
    {\"id\": \"foo\",
     \"name\": \"on\",
     \"params\": [\"5\", \"7\"]
    }
  ]
}"))]
      (is (= (:status response) 200))
      (is (= (slurp (:body response))
             "{\"steps\":[{\"highlight\":[\"foo\"],\"changes\":[{\"x\":\"5\",\"y\":\"7\",\"state\":\"on\"}],\"errors\":[]}],\"success\":true}"))))

  (testing "solutions 2"
    (let [response (app (body (request :post "/solutions/0") "{
  \"code\": [
    {\"id\": \"foo\",
     \"name\": \"on\",
     \"params\": [\"\", \"7\"]
    }
  ]
}"))]
      (is (= (:status response) 200))
      (is (= (slurp (:body response))
             "{\"steps\":[{\"highlight\":[\"foo\"],\"changes\":[],\"errors\":[\"You need to enter a number in both boxes\"]}],\"success\":false}")))))