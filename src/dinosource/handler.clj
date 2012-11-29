(ns dinosource.handler
  	(:use compojure.core
          dinosource.exercise
          dinosource.solution
          ring.util.response
          [ring.middleware.format-response :only [wrap-restful-response]])
  	(:require	[compojure.handler :as handler]
    	    	[compojure.route :as route]
             	[cheshire.core :as json]))

(defroutes app-routes
    (GET "/exercises" [] (response (get-exercise)))
    (GET "/exercises/:id" [id]
         (response (get-exercise (Integer. id))))
    (POST "/solutions/:id" {body :body}
          (response (process-solution (json/parse-string (slurp body) true))))
    (route/files "/")
  	(route/not-found "Not Found"))

(def app
	(->
    	(handler/site app-routes)
    	(wrap-restful-response)))