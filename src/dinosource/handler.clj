(ns dinosource.handler
  	(:use compojure.core
          dinosource.exercise
          dinosource.solution
          ring.util.response
          [ring.middleware.format-response :only [wrap-restful-response]]
          [ring.middleware.format-params :only [wrap-restful-params]])
  	(:require	[compojure.handler :as handler]
    	    	[compojure.route :as route]
             	[clojure.data.json :as json]))

(defroutes app-routes
    (GET "/exercises" [] (response (get-exercise)))
    (GET "/exercises/:id" [id]
         (response (get-exercise (Integer. id))))
    (POST "/solutions/:id" {params :params}
;         (. System/out (println params)))
          (response (process-solution params)))
    (route/files "/")
  	(route/not-found "Not Found"))

(def app
	(->
    	(handler/site app-routes)
     	(wrap-restful-params)
    	(wrap-restful-response)))