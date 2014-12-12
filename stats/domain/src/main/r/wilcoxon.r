## Wilcoxon Rank Sum test

## input variables from MeV:
# INFILE: DATA FILE matrix
# SAMPLE_FILE: File store contrast 
# ALT_HYPOTHESIS: 'two.sided'/'greater'/'less'. Default='two.sided'
# IS_PAIRED: boolean. Default=FALSE
# IS_CONF_INT: boolean. Default=FALSE
# CORRECT_FOR_MULTIPLE_TESTING

## output file
# WILCOX_OUT

##
##
## read files
in.mtx=read.table(INFILE, header=TRUE, sep="\t", nrow=-1)

##
## Assume the file starts with \t and the first column is gene id
rownames(in.mtx)=in.mtx[,1]
in.mtx=na.omit(in.mtx[,-1])
in.mtx=data.matrix(in.mtx)

## Check to determine if matrix contains negative values
## off set the matrix to operate in positive values for limma
## starting with 0
min.val=min(in.mtx)
in.mtx=if(min.val<0){in.mtx+min.val*-1}else{in.mtx}


## Assign group
sample.mtx=read.table(SAMPLE_FILE, header=FALSE, sep="\t")
EXP=sample.mtx[(sample.mtx[,2]==1),1]
CON=sample.mtx[(sample.mtx[2]==0),1]



result_mtx=matrix(NA, nrow=dim(in.mtx)[1], ncol=dim(in.mtx)[2]) 	  
colnames(result_mtx)=c("ID", "Log Fold Change", "Average Expression", "W", "P-value", "q-value")

w.test=lapply(rownames(in.mtx), function(X){
  		CONTROL=in.mtx[X, CON]
  		EXPERIMENT=in.mtx[X, EXP]
		w.test = wilcox.test(x=CONTROL, y=EXPERIMENT, alternative=ALT_HYPOTHESIS, paired=IS_PAIRED, 
			conf.int=IS_CONF_INT)
		logfc=log(mean(CONTROL)/mean(EXPERIMENT))
		mean.exp=mean(in.mtx[X,])
		return(cbind('Method'=w.test$method, 'W statistics'=w.test$statistic, 'P-value'=w.test$p.value, logfc, mean.exp))
  	})
 
result_mtx=w.test[[1]]
for(idx in 2:length(a)){
 	result_mtx=rbind(result_mtx, w.test[[idx]])
}
rownames(result_mtx)=NULL
qvalue=p.adjust(as.numeric(result_mtx[,"P-value"]),method="fdr")
result_mtx=cbind(result_mtx, 'adj.P-value'=qvalue)

write.table(file=OUTFILE, result_mtx, sep='\t',col.names=FALSE, quote=FALSE)

## End Wilcoxon test