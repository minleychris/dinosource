(defproject dinosource "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [compojure "1.1.3"]
                 [org.clojure/data.json "0.2.0"]
                 [ring-middleware-format "0.2.2"]]
  :plugins [[lein-ring "0.7.5"]]
  :ring {:handler dinosource.handler/app}
  :profiles
  {:dev {:dependencies [[ring-mock "0.1.3"]]}})
